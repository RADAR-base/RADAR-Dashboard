import { Action } from '@ngrx/store'

import { Study } from '../../models/study.model'

export const LOAD = '[Overview][Studies] LOAD'
export const LOAD_SUCCESS = '[Overview][Studies] LOAD_SUCCESS'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Study[]) {}
}

export type Actions = Load | LoadSuccess
