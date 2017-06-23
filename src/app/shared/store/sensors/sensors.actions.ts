import { Action } from '@ngrx/store'

import { Source } from '../source/source.model'
import { Sensor } from './sensors.model'

export const GET_ALL = '[Sensor] GET_ALL'
export const GET_ALL_SUCCESS = '[Sensor] GET_ALL_SUCCESS'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor (public payload: Source[]) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor (public payload: Sensor[]) {}
}

export type Actions
  = GetAll
  | GetAllSuccess
