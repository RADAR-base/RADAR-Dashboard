import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { Subject } from './subject.model'

@Injectable()
export class SubjectService {

  constructor (private http: Http) {}

  get (): Observable<Subject[]> {
    const studyId = 0
    const url = `${PARAMS.API_URI}/subject/getAllSubjects/${studyId}`

    return this.http.get(url)
      .map(this.parse)
      .catch(ErrorService.handleError)
  }

  parse (response) {
    console.log(response.json().subjects)

    return response.json().subjects || []
  }
}

