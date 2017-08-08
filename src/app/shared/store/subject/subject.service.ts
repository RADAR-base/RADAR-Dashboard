import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { Subject } from './subject.model'

@Injectable()
export class SubjectService {
  constructor(private http: Http) {}

  getAll(studyId): Observable<Subject[]> {
    const url = `${PARAMS.API_URI}/subject/getAllSubjects/${studyId}`

    return this.http
      .get(url)
      .map(res => res.json().subjects || [])
      .catch(ErrorService.handleError)
  }
}
