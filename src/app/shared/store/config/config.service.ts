import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { ErrorService } from '../../services/error.service'
import { Config } from './config.model'

@Injectable()
export class ConfigService {

  constructor (private http: Http) {}

  get (): Observable<Config> {
    return this.http.get(`${PARAMS.API_FIREBASE}/config.json`)
      .map(res => res.json() || [])
      .catch(ErrorService.handleError)
  }

}
