import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { filter, map, take } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Study } from '../../shared/models/study.model'

@Injectable()
export class StudiesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Study[]> {
    return this.http.get<any>(`${ENV.API_URI}/projects`).pipe(
      filter(d => d !== null),
      map(res => res.dataset),
      take(1)
    )
  }
}
