import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Subject } from '../../shared/models/subject.model'

@Injectable()
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAll(studyId): Observable<Subject[]> {
    const url = `${ENV.API_URI}/subject/getAllSubjects/${studyId}`

    return this.http.get<any>(url).pipe(
      filter(d => d !== null),
      map(res => res.subjects)
    )
  }
}
