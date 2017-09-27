import { Action } from '@ngrx/store'

import { Subject } from '../../models/study.model'

export const LOAD_SUBJECTS = '[Study] LOAD_SUBJECTS'
export const LOAD_SUBJECTS_SUCCESS = '[Study] LOAD_SUBJECTS_SUCCESS'

export class LoadSubjects implements Action {
  readonly type = LOAD_SUBJECTS

  constructor(public payload: string) {}
}

export class LoadSubjectsSuccess implements Action {
  readonly type = LOAD_SUBJECTS_SUCCESS

  constructor(public payload: Subject[]) {}
}

export type Actions = LoadSubjects | LoadSubjectsSuccess
