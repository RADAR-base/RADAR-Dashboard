import { Action } from '@ngrx/store'

import { Subject } from '../../models/subject.model'

export const SET_STUDY_ID = '[Subject][Subject] SET_STUDY_ID'
export const SET_ID = '[Subject][Subject] SET_ID'

export class SetStudyId implements Action {
  readonly type = SET_STUDY_ID

  constructor(public payload: string) {}
}

export class SetId implements Action {
  readonly type = SET_ID

  constructor(public payload: string) {}
}

export type Actions = SetStudyId | SetId
