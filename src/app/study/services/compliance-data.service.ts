import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { TimeWindow } from '../../shared/enums/time-window.enum'
import { parseTimeHoles } from '../../shared/utils/parse-time-holes'

@Injectable()
export class ComplianceDataService {
  constructor(private http: HttpClient) {}

  getAll(studyName): Observable<any> {
    // TODO: Change when API is ready
    return this.http.get<any>(`${ENV.API_LOCAL}/mock-compliance.json`).pipe(
      delay(1000),
      map(response => {
        if (response) {
          return parseTimeHoles(
            response.dataset,
            response.header.effectiveTimeFrame,
            response.header.timeWindow,
            true
          )
        }
      })
    )
  }
}
