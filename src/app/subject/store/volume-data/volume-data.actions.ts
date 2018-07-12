import { Dictionary } from '@ngrx/entity/src/models'
import { Action } from '@ngrx/store'

export const LOAD = '[VolumeData] LOAD'
export const LOAD_SUCCESS = '[VolumeData] LOAD_SUCCESS'
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

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = Load | LoadSuccess | LoadFail | Destroy
