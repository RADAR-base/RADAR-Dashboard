import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import { AppConfig } from '../../../shared/utils/config'
import { Source } from '../models/subject.model'

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
