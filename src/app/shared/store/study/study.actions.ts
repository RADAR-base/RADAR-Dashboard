import { Action } from '@ngrx/store'
import { Study } from './study.model'

export const LOAD = '[Study] Load'
export const LOAD_SUCCESS = '[Study] Load Success'
export const SELECT = '[Study] Select'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor (public payload: Study[]) {}
}

export class Select implements Action {
  readonly type = SELECT

  constructor (public payload: string) {}
}

export type Actions
  = Load
  | LoadSuccess
  | Select
