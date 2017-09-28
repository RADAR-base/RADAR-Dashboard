import { Action } from '@ngrx/store'

export const SUBJECT_DESTROY = '[Pages] SUBJECT_DESTROY'

export class SubjectDestroy implements Action {
  readonly type = SUBJECT_DESTROY
}

export type Actions = SubjectDestroy
