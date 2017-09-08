import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { WebWorkerService } from 'angular2-web-worker'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeSeries } from '../../models/time-series.model'
import { ErrorService } from '../../services/error.service'
import { ParseTimeHolesWorker } from '../../utils/ParseTimeHoles.worker'
import { AppConfig } from '../../utils/config'
import { Source } from '../source/source.model'
import * as fromRoot from '../'
import { DataTypes } from './sensors.model'

@Injectable()
export class SensorsService {
  private URL = `${PARAMS.API_URI}/data`

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private webWorkerService: WebWorkerService
  ) {}

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
    dataType
  ): Observable<TimeSeries[] | MultiTimeSeries[]> {
    const url = this.parseURL(sensor, subjectId, timeFrame)

    return this.http
      .get(url)
      .withLatestFrom(this.store.select(fromRoot.getSensorsPristine))
      .takeWhile(([res, pristine]) => !pristine)
      .map(([res, _]) => res)
      .switchMap((res: any) => {
        // Object needs to be constructed from Object literals only
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
        const dataObject = {
          timeFrame,
          interval: AppConfig.config.timeIntervals[res.header.timeFrame].value,
          isSingle: dataType === DataTypes.single,
          keys: sensor.keys,
          dataset: res.dataset
        }

        return Observable.fromPromise(
          this.webWorkerService.run(ParseTimeHolesWorker, dataObject)
        )
      })
      .catch(ErrorService.handleError)
  }

  // TODO: setup 'AVERAGE' & 'TEN_SECOND' when API is ready
  private parseURL(sensor, subjectId, timeFrame) {
    return [
      this.URL,
      sensor.type,
      'AVERAGE/TEN_SECOND',
      subjectId,
      sensor.source,
      timeFrame.start,
      timeFrame.end
    ].join('/')
  }
}
