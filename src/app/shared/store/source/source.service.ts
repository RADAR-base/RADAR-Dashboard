import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { AppConfig } from '../../utils/config'
import { Source } from './source.model'

@Injectable()
export class SourceService {
  constructor(private http: Http) {}

  getAll(subjectId): Observable<Source[]> {
    const url = `${PARAMS.API_URI}/source/getAllSources/${subjectId}`

    return (
      this.http
        .get(url)
        .map(res => {
          return res.status === 200 ? res.json().sources || [] : []
        })
        .map(this.removeNonSupportedTypes)
        // .map(this.addVisibleProp)
        // .map(this.addSensors)
        .catch(ErrorService.handleError)
    )
  }

  // Inject visible prop
  addVisibleProp(res) {
    return res.map((d: Source) => ({ ...d, visible: true }))
  }

  // Inject sensors
  addSensors(res) {
    return res.map((d: Source) => {
      const sensorList = AppConfig.config.specs[d.type]
      const sensors = sensorList.map(sensor => AppConfig.config.sensors[sensor])

      return sensors ? { ...d, sensors } : { ...d, sensors: {} }
    })
  }

  // TODO: remove filter when API and data are ready
  removeNonSupportedTypes(res) {
    return res.filter((d: Source) => d.type === 'EMPATICA')
  }
}
