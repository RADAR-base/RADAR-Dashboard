import { Action } from '@ngrx/store'

import { Source } from '../source/source.model'

export const GET_ALL = '[Sensor] GET_ALL'
export const GET_ALL_SUCCESS = '[Sensor] GET_ALL_SUCCESS'
export const DESTROY = '[Sensor] DESTROY'
export const TOGGLE_VISIBILITY = '[Sensor] TOGGLE_VISIBILITY'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: Source[]) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: Source[]) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: any) {}
}

export type Actions = GetAll | GetAllSuccess | Destroy | ToggleVisibility
