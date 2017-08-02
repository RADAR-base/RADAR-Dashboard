import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../../shared/services/error.service'

@Injectable()
export class ComplianceService {

  constructor (private http: Http) {}

  getAll (): Observable<any> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }

  // Sample get data for one user
  getSelected (): Observable<any> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-compliance-single.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }

}
