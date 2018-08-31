import { Dictionary } from '@ngrx/entity/src/models'
import { Action } from '@ngrx/store'

import { SourceType } from '../../../shared/models/source-type.model'
import { Subject } from '../../../shared/models/subject.model'

export const LOAD = '[Sources] LOAD'
export const INJECT_SOURCE_DATA = '[Sources] INJECT_SOURCE_DATA'
export const TOGGLE_VISIBILITY = '[Sources] TOGGLE_VISIBILITY'
export const LOAD_SUCCESS = '[Sources] LOAD_SUCCESS'
export const LOAD_FAIL = '[Sources] LOAD_FAIL'
export const DESTROY = '[Sources] DESTROY'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Subject) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class InjectSourceData implements Action {
  readonly type = INJECT_SOURCE_DATA

  constructor(public payload: Dictionary<SourceType>) {}
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: { sourceDataUid: string; sourceId: string }) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions =
  | Load
  | LoadSuccess
  | LoadFail
  | InjectSourceData
  | ToggleVisibility
  | Destroy
