import { Action } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'

export const LOAD = '[OverviewPage][Studies] LOAD'
export const LOAD_SUCCESS = '[OverviewPage][Studies] LOAD_SUCCESS'
export const LOAD_FAIL = '[OverviewPage][Studies] LOAD_FAIL'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Study[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export type Actions = Load | LoadSuccess | LoadFail
