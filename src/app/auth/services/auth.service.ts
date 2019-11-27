import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { map } from 'rxjs/operators'

import { ENV } from '../../../environments/environment'
import { AppConfig } from '../../shared/app-config'
import { AuthData, AuthResponse } from '../models/auth'
import { storageItems } from '../models/storage'
import { User } from '../models/user'

@Injectable()
export class AuthService {
  DefaultRequestEncodedContentType = 'application/x-www-form-urlencoded'
  TOKEN_URI = `${ENV.AUTH_URI}/token`

  constructor(private httpClient: HttpClient) {}

  static getToken(): string {
    return localStorage.getItem(storageItems.token)
  }

  static getUser(): User {
    const user = localStorage.getItem(storageItems.user)
    return JSON.parse(user)
  }

  static basicCredentials(user: string, password: string): string {
    return 'Basic ' + btoa(`${user}:${password}`)
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

  login(code) {
    if (!code && !ENV.TEST) {
      throw new Error('Invalid code')
    }
    return this.httpClient
      .post<AuthResponse>(this.TOKEN_URI, this.getAuthParams(code), {
        headers: this.getAuthHeaders()
      })
      .pipe(
        map((response: any) => ({
          token: response.access_token,
          user: this.parseUser(response.sub, response.roles)
        }))
      )
  }

  parseUser(username: string, roles: string[]): User {
    return { username: username, name: '', roles: roles }
  }

  logout() {
    return of(true)
  }

  getAuthHeaders() {
    const basicCreds = AuthService.basicCredentials(
      ENV.AUTH.client_id,
      ENV.AUTH.client_secret
    )
    return new HttpHeaders()
      .set('Authorization', basicCreds)
      .set('Content-Type', this.DefaultRequestEncodedContentType)
  }

  getAuthParams(code?: string) {
    if (ENV.TEST) {
      return new HttpParams({
        fromObject: {
          ...ENV.AUTH,
          ...AppConfig.config.testUser
        }
      })
    }
    return new HttpParams()
      .set('grant_type', ENV.AUTH.grant_type)
      .set('redirect_uri', window.location.href.split('?')[0])
      .set('code', code)
  }
}
