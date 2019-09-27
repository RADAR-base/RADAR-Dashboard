import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { ENV } from '../../../environments/environment'
import { Study } from '../../shared/models/study.model'

@Injectable()
export class StudiesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Study[]>(`${ENV.SETTINGS.API_URI}/projects`)
  }
}
