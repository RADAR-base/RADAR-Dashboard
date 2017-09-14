import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { AppConfig } from '../../utils/config'
import { ParseTimeHoles } from '../../utils/parse-time-holes'

@Injectable()
export class ComplianceService {
  constructor(private http: HttpClient) {}

  getAll(studyId): Observable<any> {
    // TODO: Change when API is ready
    return this.http
      .get<any>(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .take(1)
      .delay(1000)
      .filter(d => d !== null)
      .map(res => {
        if (res) {
          return ParseTimeHoles(
            res.dataset,
            {
              start: new Date(
                res.header.effectiveTimeFrame.startDateTime
              ).getTime(),
              end: new Date(res.header.effectiveTimeFrame.endDateTime).getTime()
            },
            AppConfig.config.timeIntervals[res.header.timeFrame].value
          )
        } else {
          return null
        }
      })
  }
}
