import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { ENV } from '../../../../environments/environment'
import { DescriptiveStatistic } from '../../enums/descriptive-statistic.enum'
import { TimeInterval } from '../../enums/time-interval.enum'
import { RadarAPISampleModel } from '../../models/radar-api.model'
import { AppConfig } from '../../utils/config'
import { parseTimeHoles } from '../../utils/parse-time-holes'
import { Source } from '../source/source.model'
import * as actions from './sensors.actions'
import { Sensor } from './sensors.model'

@Injectable()
export class SensorsService {
  private URL = `${ENV.PARAMS.API_URI}/data`
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

  addSensorSpecsToSources(sources): Observable<Source[]> {
    return Observable.of(
      sources.map((d: Source) => {
        const sensorSpecs = AppConfig.config.specs[d.type]
        const sensors = sensorSpecs.map(sensor => ({
          ...AppConfig.config.sensors[sensor],
          type: sensor
        }))
        return sensors ? { ...d, sensors } : d
      })
    )
  }

  getData(sensors, options): Observable<any> {
    this.options = options
    this.sensors = sensors.slice().reverse()

    this.sensors$.next(this.sensors.pop()) // get the first sensor

    return this.queue$.asObservable() // subscribed in the @effects
  }

  private getNextSensorData(sensor) {
    const url = this.parseURL(sensor)

    this.http
      .get<RadarAPISampleModel>(url)
      .take(1)
      .takeUntil(this.destroy$)
      .subscribe(response => {
        if (this.sensors.length) {
          this.sensors$.next(this.sensors.pop())
        }

        if (response) {
          this.queue$.next({
            data: parseTimeHoles(
              response.dataset,
              this.options.timeFrame,
              this.options.timeInterval
            ),
            sensor
          })
        } else {
          this.queue$.next({ data: null, sensor })
        }
      })
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND' when API is ready
  private parseURL(sensor) {
    return [
      this.URL,
      sensor.type,
      DescriptiveStatistic[this.options.descriptiveStatistic],
      TimeInterval[this.options.timeInterval],
      this.options.subjectId,
      sensor.source,
      this.options.timeFrame.start,
      this.options.timeFrame.end
    ].join('/')
  }
}
