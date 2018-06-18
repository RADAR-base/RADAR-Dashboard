import { Action } from '@ngrx/store'

import { Subject } from '../../../shared/models/subject.model'

export const LOAD = '[Study][Subject] LOAD'
export const LOAD_SUCCESS = '[Study][Subject] LOAD_SUCCESS'
export const LOAD_FAIL = '[Study][Subject] LOAD_FAIL'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Subject[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export type Actions = Load | LoadSuccess | LoadFail
