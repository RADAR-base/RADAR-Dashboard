import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { AppConfig } from '../../shared/app-config'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { SampleDataModel } from '../../shared/models/sample-data.model'
import { Sensor } from '../../shared/models/sensor.model'
import { Source } from '../../shared/models/source.model'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import * as sensorsDataActions from '../store/sensors-data/sensors-data.actions'

@Injectable()
export class SensorsDataService {
  private url = `${ENV.API_URI}/data`
  private sensorsDataLoad$: Observable<Action>
  private queue$ = new Subject<any>()
  private sensors$ = new Subject<Sensor>()
  private sensors: Sensor[] = []
  private options: any = {}

  constructor(private http: HttpClient, private actions$: Actions) {
    this.sensorsDataLoad$ = this.actions$.ofType(sensorsDataActions.LOAD)
    this.sensors$.subscribe(sensor => {
      this.getNextSensorData(sensor)
    })
  }

  getData(sources: Source[], options): Observable<any> {
    this.options = options
    this.sensors = sources.reduce(
      (accumulator, source) => [...accumulator, ...source.sourceData],
      []
    )

    // get the first sensor
    this.sensors$.next(this.sensors.pop())

    // observable is subscribed by @ngrx/effects
    return this.queue$.asObservable()
  }

  private getNextSensorData(sensor) {
    if (sensor === null) {
      this.queue$.next({ data: null, sensor })
      this.nextSensor()
      return
    }

    this.http
      .get<SampleDataModel>(this.parseURL(sensor))
      .pipe(takeUntil(this.sensorsDataLoad$))
      .subscribe(
        (response: SampleDataModel) => {
          const dataset = response && response.dataset
          const header = response && response.header
          const config = AppConfig.config.sourceData[header.sourceDataType]

          if (dataset && dataset.length) {
            this.queue$.next({
              data: parseTimeHoles(
                dataset,
                header.effectiveTimeFrame,
                header.timeWindow,
                config.chart.timeHoles
              ).sort((a, b) => a.date - b.date),
              sensor
            })
          } else {
            this.queue$.next({ data: null, sensor })
          }

          this.nextSensor()
        },
        error => {
          this.queue$.next({ data: null, sensor })
          this.nextSensor()
          console.error(error)
        }
      )
  }

  private nextSensor() {
    if (this.sensors.length) {
      this.sensors$.next(this.sensors.pop())
    }
  }

  private parseURL(sensor: Sensor): string {
    let url = [
      this.url,
      this.options.studyName,
      this.options.subjectId,
      sensor.sourceId,
      sensor.sourceDataName,
      DescriptiveStatistic[this.options.descriptiveStatistic]
    ].join('/')

    url = url + '?'
    url = `${url}timeWindow=${this.options.timeWindow}`

    const startTime =
      this.options.timeFrame.start || this.options.queryParams.startTime || null
    const endTime =
      this.options.timeFrame.start || this.options.queryParams.endTime || null

    startTime ? (url = `${url}&startTime=${startTime}`) : (url = url)
    endTime ? (url = `${url}&endTime=${endTime}`) : (url = url)

    return url
  }
}
