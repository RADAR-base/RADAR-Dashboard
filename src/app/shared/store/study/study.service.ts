import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { Study } from './study.model'

@Injectable()
export class StudyService {

  constructor (private http: Http) {}

  get (): Observable<Study[]> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-all-studies.json`)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }
}
