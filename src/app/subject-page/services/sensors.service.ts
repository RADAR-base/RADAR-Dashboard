import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Source } from '../../shared/models/source.model'
import { AppConfig } from '../../shared/utils/config'

@Injectable()
export class SensorsService {
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
