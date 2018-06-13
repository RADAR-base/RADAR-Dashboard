import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { Config } from '../../shared/models/config.model'
import { AppConfig } from '../../shared/utils/config'
import { ErrorService } from './error.service'

@Injectable()
export class ConfigService {
  isLoaded$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) {}

  load() {
    this.http
      .get<Config>(`${ENV.API_FIREBASE}/config.json`)
      .pipe(catchError(ErrorService.handleError))
      .subscribe(config => {
        AppConfig.config = config
        this.isLoaded$.next(true)
      })
  }
}
