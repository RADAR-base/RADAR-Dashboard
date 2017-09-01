import { Action } from '@ngrx/store'

import { Source } from '../source/source.model'
import { Sensor } from './sensors.model'

export const GET_ALL = '[Sensor] GET_ALL'
export const GET_ALL_SUCCESS = '[Sensor] GET_ALL_SUCCESS'
export const GET_ALL_DATA = '[Sensor] GET_ALL_DATA'
export const GET_ALL_DATA_SUCCESS = '[Sensor] GET_ALL_DATA_SUCCESS'
export const DESTROY = '[Sensor] DESTROY'
export const TOGGLE_VISIBILITY = '[Sensor] TOGGLE_VISIBILITY'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: { subjectId: String; data: Source[] }) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: { subjectId: String; data: Source[] }) {}
}

export class GetAllData implements Action {
  readonly type = GET_ALL_DATA

  constructor(public payload: { subjectId: String; data: Sensor }) {}
}

export class GetAllDataSuccess implements Action {
  readonly type = GET_ALL_DATA_SUCCESS

  constructor(public payload: { id: any; data: any }) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: any) {}
}

export type Actions =
  | GetAll
  | GetAllData
  | GetAllDataSuccess
  | GetAllSuccess
  | Destroy
  | ToggleVisibility
