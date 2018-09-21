import { Action } from '@ngrx/store'

export const LOAD = '[Study][Compliance] LOAD'
export const LOAD_SUCCESS = '[Study][Compliance] LOAD_SUCCESS'
export const LOAD_FAIL = '[Study][Compliance] LOAD_FAIL'
export const SET_TIME_FRAME = '[Study][Compliance] SET_TIME_FRAME'
export const DESTROY = '[Study][Compliance] DESTROY'

export class Load implements Action {
  readonly type = LOAD
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  // TODO: Change to Compliance[] type
  constructor(public payload: any) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL
}

export class SetTimeFrame implements Action {
  readonly type = SET_TIME_FRAME

  constructor(public payload: any) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = Load | LoadSuccess | LoadFail | SetTimeFrame | Destroy
