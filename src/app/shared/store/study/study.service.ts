import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { Study } from './study.model'

@Injectable()
export class StudyService {

  constructor (private http: Http) {}

  getAll (): Observable<Study[]> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-all-studies.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }

  getById (id): Observable<Study> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-all-studies.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .map(res => res.filter((data: Study) => data.id === id)[0] || null)
      .catch(ErrorService.handleError)
  }
}
