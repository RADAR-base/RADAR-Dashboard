import { Action } from '@ngrx/store'

import { TimeFrame } from '../../../shared/models/time.model'

export const LOAD = '[VolumeData] LOAD'
export const LOAD_SUCCESS = '[VolumeData] LOAD_SUCCESS'
export const SET_TIME_FRAME = '[VolumeData] SET_TIME_FRAME'
export const SET_TIME_INTERVAL = '[VolumeData] SET_TIME_INTERVAL'
export const LOAD_FAIL = '[VolumeData] LOAD_FAIL'
export const LOAD_FAIL_RESET = '[VolumeData] LOAD_FAIL_RESET'
export const LOAD_FAIL_RESET_SUCCESS = '[VolumeData] LOAD_FAIL_RESET_SUCCESS'
export const DESTROY = '[VolumeData] DESTROY'
export const SET_TO_LOADING = '[VolumeData] SET_TO_LOADING'

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

export class LoadFailReset implements Action {
  readonly type = LOAD_FAIL_RESET
}

export class LoadFailResetSuccess implements Action {
  readonly type = LOAD_FAIL_RESET_SUCCESS
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

export class SetToLoading implements Action {
  readonly type = SET_TO_LOADING
}

export type Actions =
  | Load
  | LoadSuccess
  | SetTimeFrame
  | SetTimeInterval
  | LoadFail
  | LoadFailReset
  | LoadFailResetSuccess
  | Destroy
  | SetToLoading
