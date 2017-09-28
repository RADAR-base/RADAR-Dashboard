import { Action } from '@ngrx/store'

import { Study } from '../../../../shared/models/study.model'

export const SET_STUDY_ID = '[Study] SET_STUDY_ID'
export const LOAD_STUDY_BY_ID = '[Study] LOAD_STUDY_BY_ID'
export const LOAD_STUDY_BY_ID_SUCCESS = '[Study] LOAD_STUDY_BY_ID_SUCCESS'

export class SetStudyId implements Action {
  readonly type = SET_STUDY_ID

  constructor(public payload: string) {}
}
export class LoadStudyById implements Action {
  readonly type = LOAD_STUDY_BY_ID

  constructor(public payload: string) {}
}

export class LoadStudyByIdSuccess implements Action {
  readonly type = LOAD_STUDY_BY_ID_SUCCESS

  constructor(public payload: Study) {}
}

export type Actions = SetStudyId | LoadStudyById | LoadStudyByIdSuccess
