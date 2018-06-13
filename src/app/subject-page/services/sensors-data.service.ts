import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { ENV } from '../../../environments/environment'
import { DescriptiveStatistic } from '../../shared/enums/descriptive-statistic.enum'
import { TimeInterval } from '../../shared/enums/time-interval.enum'
import { RadarAPISampleModel } from '../../shared/models/radar-api.model'
import { Sensor } from '../../shared/models/sensor.model'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'
import * as actions from '../store/sensors-data/sensors-data.actions'

@Injectable()
export class SensorsDataService {
  private URL = `${ENV.API_URI}/data`
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
