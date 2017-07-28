import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../../shared/services/error.service'

@Injectable()
export class SubjectTableService {

  constructor (private http: Http) {}

  getAll (subjectId, sourceId, type): Observable<any> {
    const url = this.parseURL(type) + `${subjectId}/${sourceId}`

    return this.http.get(url)
      .map(res => res.json() || [])
      .catch(ErrorService.handleError)
  }

  private parseURL (type) {
    if (type === 'ANDROID') {
      return `${PARAMS.API_URI}/android/status/`
    } else {
      return `${PARAMS.API_URI}/source/state/`
    }
  }

}
