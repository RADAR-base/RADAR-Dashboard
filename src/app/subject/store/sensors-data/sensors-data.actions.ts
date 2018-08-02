import { Action } from '@ngrx/store'

import { ChartData } from '../../../shared/models/chart-data.model'
import { Sensor } from '../../../shared/models/sensor.model'
import { TimeFrame } from '../../../shared/models/time.model'

export const LOAD = '[SensorsData] LOAD'
export const LOAD_SUCCESS = '[SensorsData] LOAD_SUCCESS'
export const LOAD_FAIL = '[SensorsData] LOAD_FAIL'
export const UPDATE_DATES = '[SensorsData] UPDATE_DATES'
export const SET_TOOLTIP_DATE = '[SensorsData] SET_TOOLTIP_DATE'
export const SET_TIME_FRAME = '[SensorsData] SET_TIME_FRAME'
export const SET_TIME_INTERVAL = '[SensorsData] SET_TIME_INTERVAL'
export const SET_DESCRIPTIVE_STATISTIC =
  '[SensorsData] SET_DESCRIPTIVE_STATISTIC'
export const DESTROY = '[SensorsData] DESTROY'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: { data: ChartData[]; sensor: Sensor }) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class UpdateDates implements Action {
  readonly type = UPDATE_DATES
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

  constructor(public payload: string) {}
}

export class SetDescriptiveStatistic implements Action {
  readonly type = SET_DESCRIPTIVE_STATISTIC

  constructor(public payload: any) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions =
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateDates
  | SetTooltipDate
  | SetTimeFrame
  | SetTimeInterval
  | SetDescriptiveStatistic
  | Destroy
