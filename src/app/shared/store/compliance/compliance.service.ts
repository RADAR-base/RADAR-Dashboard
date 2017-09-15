import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { getTime } from '../../utils/get-time'
import { parseTimeHoles } from '../../utils/parse-time-holes'
import { TimeInterval } from '../sensors/sensors.model'

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
          return parseTimeHoles(
            res.dataset,
            {
              start: getTime(res.header.effectiveTimeFrame.startDateTime),
              end: getTime(res.header.effectiveTimeFrame.endDateTime)
            },
            TimeInterval[res.header.timeFrame]
          )
        } else {
          return null
        }
      })
  }
}
