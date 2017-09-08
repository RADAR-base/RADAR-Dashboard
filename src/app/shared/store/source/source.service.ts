import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { Source } from './source.model'

@Injectable()
export class SourceService {
  constructor(private http: HttpClient) {}

  getAll(subjectId): Observable<Source[]> {
    const url = `${PARAMS.API_URI}/source/getAllSources/${subjectId}`

    return this.http
      .get<any>(url)
      .filter(d => d !== null)
      .map(res => res.sources)
      .map(this.removeNonSupportedTypes)
  }

  // TODO: remove filter when API and data are ready
  removeNonSupportedTypes(res) {
    return res.filter((d: Source) => d.type === 'EMPATICA')
  }
}
