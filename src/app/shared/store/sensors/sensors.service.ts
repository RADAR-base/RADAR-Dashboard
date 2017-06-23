import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { AppConfig } from '../../utils/config'
import { Source } from '../source/source.model'

@Injectable()
export class SensorsService {

  constructor () {}

  getAll (sources): Observable<Source[]> {
    return Observable.of(
      sources.map((d: Source) => {
        const sensorList = AppConfig.config.specs[d.type]
        const sensors = sensorList.map(sensor => AppConfig.config.sensors[sensor])

        return sensors
          ? { ...d, sensors }
          : d
      })
    )
  }

}
