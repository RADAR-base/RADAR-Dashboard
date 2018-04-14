import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'

import { ENV } from '../../../environments/environment.tools'
import { AuthResponse, UserAuth } from '../models/auth'

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login({ username, password }: UserAuth) {
    const body = new HttpParams({
      fromObject: {
        ...ENV.AUTH,
        username,
        password
      }
    })

    return this.httpClient.post<AuthResponse>(ENV.AUTH_URI, body)
  }

  logout() {
    return of(true)
  }
}
