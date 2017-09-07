import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeSeries } from '../../models/time-series.model'
import { ErrorService } from '../../services/error.service'
import { AppConfig } from '../../utils/config'
import { ParseMultiValueData } from '../../utils/ParseMultiValueData'
import { ParseTimeHoles } from '../../utils/ParseTimeHoles'
import { Source } from '../source/source.model'
import * as fromRoot from '../'
import { DataTypes } from './sensors.model'

@Injectable()
export class SensorsService {
  private URL = `${PARAMS.API_URI}/data`

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {}

  addSpecsToSources(sources): Observable<Source[]> {
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
      .map((res: any) => {
        // TODO: Remove ugly hack
        // API is not returning the expected timeFrame
        res.header.effectiveTimeFrame = {
          startDateTime: timeFrame.start.toISOString(),
          endDateTime: timeFrame.end.toISOString()
        }

        return dataType === DataTypes.single
          ? ParseTimeHoles(res)
          : ParseMultiValueData(ParseTimeHoles(res, true), sensor.keys)
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
      timeFrame.start.valueOf(),
      timeFrame.end.valueOf()
    ].join('/')
  }
}
