import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ENV } from '../../../environments/environment'
import { Subject } from '../../shared/models/subject.model'

@Injectable()
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAll(studyName) {
    const url = `${ENV.API_URI}/projects/${studyName}/subjects`

    // TODO: getting 500 error from API on some projects
    // https://github.com/RADAR-base/RADAR-RestApi/issues/97
    return this.http.get<Subject[]>(url)
  }
}
