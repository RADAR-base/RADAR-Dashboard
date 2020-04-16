import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Subject } from '../../shared/models/subject.model'

@Injectable()
export class SubjectService {
  GOOGLE_STORAGE_URI =
    'http://staging.radar-armt-notification.appspot.com.storage.googleapis.com'

  constructor(private http: HttpClient) {}

  getAll(studyName) {
    const url = `${ENV.API_URI}/projects/${studyName}/subjects`

    return this.http.get<Subject[]>(url, { params: { size: '500' } })
  }

  getAppResets(studyName) {
    const options = {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text' as 'json'
    }
    return this.http
      .get<any>(`${this.GOOGLE_STORAGE_URI}/app_resets_90_days`, options)
      .pipe(
        map(response => {
          if (response) {
            const parsed = this.parseLineDelimitedJson(response)
            return parsed.filter(a => a.projectId === studyName)
          }
        })
      )
  }

  getAppRemoves(studyName) {
    const options = {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text' as 'json'
    }
    return this.http
      .get<any>(`${this.GOOGLE_STORAGE_URI}/app_removals_90_days`, options)
      .pipe(
        map(response => {
          if (response) {
            const parsed = this.parseLineDelimitedJson(response)
            return parsed.filter(a => a.projectId === studyName)
          }
        })
      )
  }

  getAppVersions(studyName) {
    const options = {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text' as 'json'
    }
    return this.http
      .get<any>(`${this.GOOGLE_STORAGE_URI}/app_versions_180_days`, options)
      .pipe(
        map(response => {
          if (response) {
            const parsed = this.parseLineDelimitedJson(response)
            return parsed.filter(a => a.projectId === studyName)
          }
        })
      )
  }

  parseLineDelimitedJson(data) {
    const array = data.split('\n')
    array.pop()
    return array.map(a => JSON.parse(a))
  }
}
