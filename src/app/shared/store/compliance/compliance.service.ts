import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ComplianceService {
  constructor(private http: HttpClient) {}

  getAll(studyId, keys, timeHoles = true): Observable<any> {
    // TODO: Change when API is ready
    return this.http
      .get<any>(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .take(1)
      .delay(1000)
      .filter(d => d !== null)
      .map(res => {
        // FIXME: change to new Parser
        // if (res) {
        //   return timeHoles
        //     ? ParseMultiValueData(ParseTimeHoles(res, true), keys, timeHoles)
        //     : ParseMultiValueData(res.dataset, keys, timeHoles)
        // } else {
        //   return null
        // }
        return null
      })
  }
}
