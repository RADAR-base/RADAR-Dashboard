import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { ENV } from '../../../../environments/environment'
import { DescriptiveStatistic } from '../../../shared/models/descriptive-statistic.enum'
import { RadarAPISampleModel } from '../../../shared/models/radar-api.model'
import { TimeInterval } from '../../../shared/models/time-interval.enum'
import { AppConfig } from '../../../shared/utils/config'
import { parseTimeHoles } from '../../../shared/utils/parse-time-holes'
import { Source, Sensor } from '../models/subject.model'
import * as actions from '../store/sensors/sensors.actions'

@Injectable()
export class SensorsService {
  constructor(private http: HttpClient, private actions$: Actions) {}

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
}
