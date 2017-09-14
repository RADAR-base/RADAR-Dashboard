import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { AppConfig } from '../utils/config'
import { ErrorService } from './error.service'

@Injectable()
export class ConfigService {
  isLoaded$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {}

  load() {
    this.http
      .get(`${PARAMS.API_FIREBASE}/config.json`)
      .catch(ErrorService.handleError)
      .subscribe(config => {
        AppConfig.config = config
        this.isLoaded$.next(true)
      })
  }
}
