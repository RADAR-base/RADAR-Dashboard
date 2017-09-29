import { Action } from '@ngrx/store'

import { Subject } from '../../../shared/models/subject.model'

export const LOAD = '[StudyPage][Subject] LOAD'
export const LOAD_SUCCESS = '[StudyPage][Subject] LOAD_SUCCESS'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Subject[]) {}
}

export type Actions = Load | LoadSuccess
