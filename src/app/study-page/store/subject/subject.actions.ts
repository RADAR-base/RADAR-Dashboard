import { Action } from '@ngrx/store'

import { Subject } from '../../../shared/models/subject.model'

export const LOAD = '[StudyPage][Subject] LOAD'
export const LOAD_SUCCESS = '[StudyPage][Subject] LOAD_SUCCESS'
export const LOAD_FAIL = '[StudyPage][Subject] LOAD_FAIL'

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
