import { Action } from '@ngrx/store'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeFrame } from '../../models/time-frame.model'
import { TimeSeries } from '../../models/time-series.model'
import { Source } from '../source/source.model'
import { DescriptiveStatistic, Sensor, TimeInterval } from './sensors.model'

export const GET_SENSORS = '[Sensor] GET_SENSORS'
export const GET_SENSORS_SUCCESS = '[Sensor] GET_SENSORS_SUCCESS'
export const UPDATE_DATES = '[Sensor] UPDATE_DATES'
export const GET_SENSORS_DATA = '[Sensor] GET_SENSORS_DATA'
export const GET_SENSORS_DATA_SUCCESS = '[Sensor] GET_SENSORS_DATA_SUCCESS'
export const SET_TIME_FRAME = '[Sensor] SET_TIME_FRAME'
export const SET_TIME_INTERVAL = '[Sensor] SET_TIME_INTERVAL'
export const SET_DESCRIPTIVE_STATISTIC = '[Sensor] SET_DESCRIPTIVE_STATISTIC'
export const DESTROY = '[Sensor] DESTROY'
export const TOGGLE_VISIBILITY = '[Sensor] TOGGLE_VISIBILITY'

export class GetSensors implements Action {
  readonly type = GET_SENSORS

  constructor(public payload: Source[]) {}
}

export class GetSensorsSuccess implements Action {
  readonly type = GET_SENSORS_SUCCESS

  constructor(public payload: Source[]) {}
}

export class UpdateDates implements Action {
  readonly type = UPDATE_DATES
}

export class GetSensorsData implements Action {
  readonly type = GET_SENSORS_DATA

  constructor(public payload: Sensor[]) {}
}

export class GetSensorsDataSuccess implements Action {
  readonly type = GET_SENSORS_DATA_SUCCESS

  constructor(
    public payload: { data: TimeSeries[] | MultiTimeSeries[]; sensor: Sensor }
  ) {}
}

export class SetTimeFrame implements Action {
  readonly type = SET_TIME_FRAME

  constructor(public payload: TimeFrame) {}
}

export class SetTimeInterval implements Action {
  readonly type = SET_TIME_INTERVAL

  constructor(public payload: TimeInterval) {}
}

export class SetDescriptiveStatistic implements Action {
  readonly type = SET_DESCRIPTIVE_STATISTIC

  constructor(public payload: DescriptiveStatistic) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export class ToggleVisibility implements Action {
  readonly type = TOGGLE_VISIBILITY

  constructor(public payload: any) {}
}

export type Actions =
  | GetSensors
  | GetSensorsSuccess
  | UpdateDates
  | GetSensorsData
  | GetSensorsDataSuccess
  | SetTimeFrame
  | SetTimeInterval
  | SetDescriptiveStatistic
  | Destroy
  | ToggleVisibility
