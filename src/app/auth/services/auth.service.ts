import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment.tools'
import { AuthData, AuthResponse, UserAuth } from '../models/auth'
import { storageItems } from '../models/storage'
import { User } from '../models/user'

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  static getToken(): string {
    return localStorage.getItem(storageItems.token)
  }

  static getUser(): User {
    const user = localStorage.getItem(storageItems.user)
    return JSON.parse(user)
  }

  getAuthData(): AuthData {
    const token = AuthService.getToken()
    const user = AuthService.getUser()
    return { token, user }
  }

  setAuthData({ token, user }) {
    localStorage.setItem(storageItems.token, token)
    localStorage.setItem(storageItems.user, JSON.stringify(user))
  }

  clearAuthData() {
    localStorage.removeItem(storageItems.token)
    localStorage.removeItem(storageItems.user)
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
