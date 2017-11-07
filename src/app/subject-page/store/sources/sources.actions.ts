import { Action } from '@ngrx/store'

import { Source } from '../../../shared/models/source.model'

export const LOAD = '[SubjectPage][Source] LOAD'
export const LOAD_SUCCESS = '[SubjectPage][Source] LOAD_SUCCESS'
export const LOAD_FAIL = '[SubjectPage][Source] LOAD_FAIL'
export const DESTROY = '[SubjectPage][Source] DESTROY'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Source[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = Load | LoadSuccess | LoadFail | Destroy
