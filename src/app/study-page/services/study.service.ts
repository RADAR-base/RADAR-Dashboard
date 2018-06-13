import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ENV } from '../../../environments/environment'
import { Study } from '../../shared/models/study.model'

@Injectable()
export class StudyService {
  constructor(private http: HttpClient) {}

  getById(id): Observable<Study> {
    // TODO: Change when API is ready
    return this.http
      .get<any>(`${ENV.API_LOCAL}/mock-all-studies.json`)
      .filter(d => d !== null)
      .map(res => res.dataset)
      .map(res => res.filter((data: Study) => data.id === id)[0] || null)
  }
}
