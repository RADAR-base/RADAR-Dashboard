import { Update } from '@ngrx/entity'
import { Action } from '@ngrx/store'

import { SourceData } from '../../../shared/models/source-data.model'
import { Source } from '../../../shared/models/source.model'

export const LOAD = '[Subject][Sensor] LOAD'
export const LOAD_SUCCESS = '[Subject][Sensor] LOAD_SUCCESS'
export const LOAD_FAIL = '[Subject][Sensor] LOAD_FAIL'
export const UPDATE_SOURCE_DATA = '[Subject][Sensor] UPDATE_SOURCE_DATA'
export const TOGGLE_VISIBILITY = '[Subject][Sensor] TOGGLE_VISIBILITY'
export const DESTROY = '[Subject][Sensor] DESTROY'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: Source[]) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: any) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class UpdateSourceData implements Action {
  readonly type = UPDATE_SOURCE_DATA

  constructor(public payload: { sourceId: string; sourceData: SourceData[] }) {}
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: any) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions =
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateSourceData
  | ToggleVisibility
  | Destroy
