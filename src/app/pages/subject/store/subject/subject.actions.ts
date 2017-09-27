import { Action } from '@ngrx/store'

import { Subject } from '../../models/subject.model'

export const SET_STUDY_ID = '[Subject] SET_STUDY_ID'
export const SET_SUBJECT_ID = '[Subject] SET_SUBJECT_ID'

export class SetStudyId implements Action {
  readonly type = SET_STUDY_ID

  constructor(public payload: string) {}
}

export class SetSubjectId implements Action {
  readonly type = SET_SUBJECT_ID

  constructor(public payload: string) {}
}

export type Actions = SetStudyId | SetSubjectId
