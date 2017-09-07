import { Action } from '@ngrx/store'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeFrame } from '../../models/time-frame.model'
import { TimeSeries } from '../../models/time-series.model'
import { Source } from '../source/source.model'
import { Sensor } from './sensors.model'

export interface SensorsPayload {
  subjectId: number
  data: Sensor[]
}

export const GET_ALL = '[Sensor] GET_ALL'
export const GET_ALL_SUCCESS = '[Sensor] GET_ALL_SUCCESS'
export const GET_ALL_DATA = '[Sensor] GET_ALL_DATA'
export const GET_ALL_DATA_SUCCESS = '[Sensor] GET_ALL_DATA_SUCCESS'
export const SET_TIME_FRAME = '[Sensor] SET_TIME_FRAME'
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

export class GetAllData implements Action {
  readonly type = GET_ALL_DATA

  constructor(public payload: Sensor) {}
}

export class GetAllDataSuccess implements Action {
  readonly type = GET_ALL_DATA_SUCCESS

  constructor(public payload: TimeSeries[] | MultiTimeSeries[]) {}
}

export class SetTimeFrame implements Action {
  readonly type = SET_TIME_FRAME

  constructor(public payload: TimeFrame) {}
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
  | SetTimeFrame
  | Destroy
  | ToggleVisibility
