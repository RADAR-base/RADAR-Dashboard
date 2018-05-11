import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment.tools'
import { AuthData, AuthResponse, UserAuth } from '../models/auth'
import { User } from '../models/user'

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  static getToken(): string {
    return localStorage.getItem('token')
  }

  static getUser(): User {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }

  getAuthData(): AuthData {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    return { token, user }
  }

  storeAuth({ token, user }) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  login(userAuth) {
    const body = new HttpParams({
      fromObject: {
        ...ENV.AUTH,
        ...userAuth
      }
    })

    return this.httpClient.post<AuthResponse>(ENV.AUTH_URI, body).pipe(
      map(response => ({
        token: response.access_token,
        user: this.parseUser(userAuth)
      }))
    )
  }

  parseUser(response): User {
    return { username: response.username, name: '', role: '' }
  }

  logout() {
    return of(true)
  }
}
