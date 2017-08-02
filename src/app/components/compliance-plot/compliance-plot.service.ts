import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/delay'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../shared/services/error.service'

@Injectable()
export class CompliancePlotService {

  constructor (private http: Http) {}

  getAll (): Observable<any> {
    // TODO: Change when API is ready
    return this.http.get(`${PARAMS.API_LOCAL}/mock-compliance.json`)
      .delay(1000)
      .map(res => res.json().dataset || [])
      .catch(ErrorService.handleError)
  }

}
