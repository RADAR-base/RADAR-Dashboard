import { Action } from '@ngrx/store'

import { ChartData } from '../../models/chart-data.model'
import { DescriptiveStatistic } from '../../models/descriptive-statistic.enum'
import { TimeFrame } from '../../models/time-frame.model'
import { TimeInterval } from '../../models/time-interval.enum'
import { Source } from '../source/source.model'
import { Sensor } from './sensors.model'

export const LOAD_SENSORS = '[Sensor] LOAD_SENSORS'
export const LOAD_SENSORS_SUCCESS = '[Sensor] LOAD_SENSORS_SUCCESS'
export const LOAD_SENSORS_DATA = '[Sensor] LOAD_SENSORS_DATA'
export const LOAD_SENSORS_DATA_SUCCESS = '[Sensor] LOAD_SENSORS_DATA_SUCCESS'
export const UPDATE_DATES = '[Sensor] UPDATE_DATES'
export const SET_TOOLTIP_DATE = '[Sensor] SET_TOOLTIP_DATE'
export const SET_TIME_FRAME = '[Sensor] SET_TIME_FRAME'
export const SET_TIME_INTERVAL = '[Sensor] SET_TIME_INTERVAL'
export const SET_DESCRIPTIVE_STATISTIC = '[Sensor] SET_DESCRIPTIVE_STATISTIC'
export const TOGGLE_VISIBILITY = '[Sensor] TOGGLE_VISIBILITY'
export const DESTROY = '[Sensor] DESTROY'

export class GetSensors implements Action {
  readonly type = LOAD_SENSORS

  constructor(public payload: Source[]) {}
}

export class GetSensorsSuccess implements Action {
  readonly type = LOAD_SENSORS_SUCCESS

  constructor(public payload: Source[]) {}
}

export class UpdateDates implements Action {
  readonly type = UPDATE_DATES
}

export class GetSensorsData implements Action {
  readonly type = LOAD_SENSORS_DATA

  constructor(public payload: Sensor[]) {}
}

export class GetSensorsDataSuccess implements Action {
  readonly type = LOAD_SENSORS_DATA_SUCCESS

  constructor(public payload: { data: ChartData[]; sensor: Sensor }) {}
}

export class SetTooltipDate implements Action {
  readonly type = SET_TOOLTIP_DATE

  constructor(public payload: Date) {}
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
  | GetSensorsData
  | GetSensorsDataSuccess
  | UpdateDates
  | SetTooltipDate
  | SetTimeFrame
  | SetTimeInterval
  | SetDescriptiveStatistic
  | ToggleVisibility
  | Destroy
