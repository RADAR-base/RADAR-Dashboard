import { Action } from '@ngrx/store'

import { AuthResponse, UserAuth } from '../models/auth'

export enum AuthActionTypes {
  SetToken = '[Auth] Set Token',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect'
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SetToken

  constructor(public payload: AuthResponse) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login

  constructor(public payload: UserAuth) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess

  constructor(public payload: AuthResponse) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout
}

export type AuthActions =
  | SetToken
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
