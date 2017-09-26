import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { ENV } from '../../../../environments/environment'
import { Study } from '../models/overview.model'

@Injectable()
export class OverviewService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Study[]> {
    // TODO: Change when API is ready
    return this.http
      .get<any>(`${ENV.PARAMS.API_LOCAL}/mock-all-studies.json`)
      .filter(d => d !== null)
      .map(res => res.dataset)
  }
}
