import { Action } from '@ngrx/store'

import { Source } from '../../../shared/models/source.model'

export const LOAD = '[SubjectPage][Sensor] LOAD'
export const LOAD_SUCCESS = '[SubjectPage][Sensor] LOAD_SUCCESS'
export const LOAD_FAIL = '[SubjectPage][Sensor] LOAD_FAIL'
export const TOGGLE_VISIBILITY = '[SubjectPage][Sensor] TOGGLE_VISIBILITY'
export const DESTROY = '[SubjectPage][Sensor] DESTROY'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: Source[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Source[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: any) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = Load | LoadSuccess | LoadFail | ToggleVisibility | Destroy
