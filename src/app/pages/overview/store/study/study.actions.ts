import { Action } from '@ngrx/store'

import { Study } from '../../models/overview.model'

export const LOAD = '[Study] LOAD'
export const LOAD_SUCCESS = '[Study] LOAD_SUCCESS'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Study[]) {}
}

export type Actions = Load | LoadSuccess
