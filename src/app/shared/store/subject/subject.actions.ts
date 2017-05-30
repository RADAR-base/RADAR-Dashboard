import { Action } from '@ngrx/store'

export const LOAD = '[Subject] Load'
export const LOAD_SUCCESS = '[Subject] Load Success'

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
