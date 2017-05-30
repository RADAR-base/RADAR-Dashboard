import { Action } from '@ngrx/store'

export const LOAD = '[Source] Load'
export const LOAD_SUCCESS = '[Source] Load Success'

export class Load implements Action {
  readonly type = LOAD

  constructor (public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor (public payload: any) {}
}

export type Actions
  = Load
  | LoadSuccess
