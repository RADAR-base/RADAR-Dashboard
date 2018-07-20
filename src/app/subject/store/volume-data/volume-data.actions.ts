import { Dictionary } from '@ngrx/entity/src/models'
import { Action } from '@ngrx/store'

import { TimeFrame } from '../../../shared/models/time.model'

export const LOAD = '[VolumeData] LOAD'
export const LOAD_SUCCESS = '[VolumeData] LOAD_SUCCESS'
export const SET_TIME_FRAME = '[VolumeData] SET_TIME_FRAME'
export const SET_TIME_INTERVAL = '[VolumeData] SET_TIME_INTERVAL'
export const LOAD_FAIL = '[VolumeData] LOAD_FAIL'
export const DESTROY = '[VolumeData] DESTROY'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: { header: any; dataset: any[] }) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class SetTimeFrame implements Action {
  readonly type = SET_TIME_FRAME

  constructor(public payload: TimeFrame) {}
}

export class SetTimeInterval implements Action {
  readonly type = SET_TIME_INTERVAL

  constructor(public payload: string) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions =
  | Load
  | LoadSuccess
  | SetTimeFrame
  | SetTimeInterval
  | LoadFail
  | Destroy
