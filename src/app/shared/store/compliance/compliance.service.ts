import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../../shared/services/error.service'
import { ParseTimeHoles } from '../../../shared/utils/ParseTimeHoles'
import { ParseMultiValueData } from '../../../shared/utils/ParseMultiValueData'

@Injectable()
export class ComplianceService {
  constructor(private http: Http) {}

  getAll(studyId, keys, timeHoles = true): Observable<any> {
    // TODO: Change when API is ready
    return this.http
      .get(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .delay(1000)
      .map(res => {
        return res.status === 200 ? res.json() || null : null
      })
      .map(res => {
        if (res) {
          return timeHoles
            ? ParseMultiValueData(ParseTimeHoles(res, true), keys, timeHoles)
            : ParseMultiValueData(res.dataset, keys, timeHoles)
        } else {
          return null
        }
      })
      .catch(ErrorService.handleError)
  }
}
