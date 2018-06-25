import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { TimeWindow } from '../../shared/enums/time-window.enum'
import { SampleDataModel } from '../../shared/models/sample-data.model'
import { Sensor } from '../../shared/models/sensor.model'
import { Source } from '../../shared/models/source.model'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import * as actions from '../store/sensors-data/sensors-data.actions'

@Injectable()
export class SensorsDataService {
  private url = `${ENV.API_URI}/data`
  private destroy$: Observable<Action>
  private queue$ = new Subject<any>()
  private sensors$ = new Subject<Sensor>()
  private sensors: Sensor[] = []
  private options: any = {}

  constructor(private http: HttpClient, private actions$: Actions) {
    this.destroy$ = this.actions$.ofType(actions.DESTROY)
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

    this.sensors$.next(this.sensors.pop()) // get the first sensor

    return this.queue$.asObservable() // subscribed in the @effects
  }

  private getNextSensorData(sensor) {
    if (!sensor) {
      this.queue$.next({ data: null, sensor })
      return false
    }

    this.http
      .get<SampleDataModel>(this.parseURL(sensor))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: SampleDataModel) => {
        if (this.sensors.length) {
          this.sensors$.next(this.sensors.pop())
        }
        if (response) {
          this.queue$.next({
            data:
              response.dataset && response.dataset.length
                ? parseTimeHoles(
                    response.dataset,
                    response.header.effectiveTimeFrame,
                    response.header.timeWindow
                  )
                : null,
            sensor
          })
        } else {
          this.queue$.next({ data: null, sensor })
        }
      })
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

    this.options.timeFrame.start
      ? (url = `${url}&startTime=${this.options.timeFrame.start}`)
      : (url = url)

    this.options.timeFrame.end
      ? (url = `${url}&startTime=${this.options.timeFrame.end}`)
      : (url = url)

    return url
  }
}
