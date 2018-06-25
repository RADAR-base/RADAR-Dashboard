import { Action } from '@ngrx/store'

import { Subject } from '../../../shared/models/subject.model'

export const LOAD = '[Study][Subjects] LOAD'
export const LOAD_FROM_API = '[Study][Subjects] LOAD_FROM_API'
export const LOAD_SUCCESS = '[Study][Subjects] LOAD_SUCCESS'
export const LOAD_FAIL = '[Study][Subjects] LOAD_FAIL'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadFromApi implements Action {
  readonly type = LOAD_FROM_API
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Subject[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export type Actions = Load | LoadFromApi | LoadSuccess | LoadFail
