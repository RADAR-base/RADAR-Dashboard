import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { Source } from '../../shared/models/source.model'
import { AppConfig } from '../../shared/utils/config'

@Injectable()
export class SensorsService {
  addSensorSpecsToSources(sources): Observable<Source[]> {
    return of(
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
