import { Action } from '@ngrx/store'
import { Study } from './study.model'

export const UPDATE = '[Study] Update'
export const UPDATE_SUCCESS = '[Study] Update Success'
export const SELECT = '[Study] Select'

export class Update implements Action {
  readonly type = UPDATE
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS

  constructor (public payload: Study[]) {}
}

export class Select implements Action {
  readonly type = SELECT

  constructor (public payload: string) {}
}

export type Actions
  = Update
  | UpdateSuccess
  | Select
