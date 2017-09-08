import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { WebWorkerService } from 'angular2-web-worker'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeSeries } from '../../models/time-series.model'
import { ParseTimeHolesWorker } from '../../utils/ParseTimeHoles.worker'
import { AppConfig } from '../../utils/config'
import { Source } from '../source/source.model'
import * as fromRoot from '../'
import * as sensorsActions from './sensors.actions'
import { DataType, DescriptiveStatistic, TimeInterval } from './sensors.model'

@Injectable()
export class SensorsService {
  private URL = `${PARAMS.API_URI}/data`
  private destroy$: Observable<Action>
  private webWorkerPromise: Promise<any>

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private webWorkerService: WebWorkerService
  ) {
    this.destroy$ = this.actions$.ofType(sensorsActions.DESTROY)
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

  getData(
    sensor,
    subjectId,
    timeFrame,
    timeInterval,
    descriptiveStatistic,
    dataType
  ): Observable<TimeSeries[] | MultiTimeSeries[]> {
    const url = this.parseURL(
      sensor,
      subjectId,
      timeFrame,
      timeInterval,
      descriptiveStatistic
    )

    return this.http
      .get<any>(url)
      .takeUntil(this.destroy$)
      .filter(d => d !== null)
      .switchMap(res => {
        // Object needs to be constructed from Object literals only
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        const dataObject = {
          timeFrame,
          timeInterval,
          isSingle: dataType === DataType.single,
          keys: sensor.keys,
          dataset: res.dataset
        }

        this.webWorkerPromise = this.webWorkerService.run(
          ParseTimeHolesWorker,
          dataObject
        )
        return Observable.fromPromise(this.webWorkerPromise)
      })
  }

  terminateWorker() {
    return Observable.fromPromise(
      this.webWorkerService.terminate(this.webWorkerPromise)
    )
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND' when API is ready
  private parseURL(
    sensor,
    subjectId,
    timeFrame,
    timeInterval,
    descriptiveStatistic
  ) {
    return [
      this.URL,
      sensor.type,
      DescriptiveStatistic[descriptiveStatistic],
      TimeInterval[timeInterval],
      subjectId,
      sensor.source,
      timeFrame.start,
      timeFrame.end
    ].join('/')
  }
}
