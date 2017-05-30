import { Action } from '@ngrx/store'
import { Config } from './config.model'

export const LOAD = '[Config] Load'
export const LOAD_SUCCESS = '[Config] Load Success'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor (public payload: Config) {}
}

export type Actions
  = Load
  | LoadSuccess
