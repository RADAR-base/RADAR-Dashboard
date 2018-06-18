import { Action } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'

export const LOAD = '[StudyPage][Study] LOAD'
export const LOAD_FROM_API = '[StudyPage][Study] LOAD_API'
export const LOAD_SUCCESS = '[StudyPage][Study] LOAD_SUCCESS'
export const LOAD_FAIL = '[StudyPage][Study] LOAD_FAIL'

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
