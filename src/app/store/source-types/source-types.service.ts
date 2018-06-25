import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { SourceType } from '../../shared/models/source-type.model'

@Injectable({
  providedIn: 'root'
})
export class SourceTypesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<SourceType[]> {
    const url = `${ENV.API_URI}/source-types`

    return this.http.get<SourceType[]>(url)
  }
}
