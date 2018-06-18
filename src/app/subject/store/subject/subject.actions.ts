import { Action } from '@ngrx/store'

export const SET_STUDY_ID = '[SubjectPage][Subject] SET_STUDY_ID'
export const SET_ID = '[SubjectPage][Subject] SET_ID'

export class SetStudyId implements Action {
  readonly type = SET_STUDY_ID

  constructor(public payload: string) {}
}

export class SetId implements Action {
  readonly type = SET_ID

  constructor(public payload: string) {}
}

export type Actions = SetStudyId | SetId
