import { Action } from '@ngrx/store'

export enum AuthActionTypes {
  GetToken = '[Auth] Get JWT Token'
}

export type AuthActions = GetToken

export class GetToken implements Action {
  readonly type = AuthActionTypes.GetToken
}
