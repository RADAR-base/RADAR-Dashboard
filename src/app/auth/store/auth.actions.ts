import { Action } from '@ngrx/store'

import { AuthData } from '../models/auth'

export enum AuthActionTypes {
  RehydrateAuth = '[Auth] Rehydrate Auth',
  StoreAuth = '[Auth] Store Auth',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect'
}

export class RehydrateAuth implements Action {
  readonly type = AuthActionTypes.RehydrateAuth
}

export class StoreAuth implements Action {
  readonly type = AuthActionTypes.StoreAuth

  constructor(public payload: AuthData) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login

  constructor() {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess

  constructor(public payload: AuthData) {}
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
  | RehydrateAuth
  | StoreAuth
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
