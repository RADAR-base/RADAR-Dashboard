import { Action } from '@ngrx/store'

import { Study } from '../../models/overview.model'

export const LOAD_STUDIES = '[Study] LOAD_STUDIES'
export const LOAD_STUDIES_SUCCESS = '[Study] LOAD_STUDIES_SUCCESS'

export class LoadStudies implements Action {
  readonly type = LOAD_STUDIES
}

export class LoadStudiesSuccess implements Action {
  readonly type = LOAD_STUDIES_SUCCESS

  constructor(public payload: Study[]) {}
}

export type Actions = LoadStudies | LoadStudiesSuccess
