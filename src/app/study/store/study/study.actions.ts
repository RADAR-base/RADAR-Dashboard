import { Action } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'

export const LOAD = '[Study][Study] LOAD'
export const LOAD_FROM_API = '[Study][Study] LOAD_API'
export const LOAD_SUCCESS = '[Study][Study] LOAD_SUCCESS'
export const LOAD_FAIL = '[Study][Study] LOAD_FAIL'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadFromApi implements Action {
  readonly type = LOAD_FROM_API
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Study) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export type Actions = Load | LoadFromApi | LoadSuccess | LoadFail
