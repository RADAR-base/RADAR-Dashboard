import { Action } from '@ngrx/store'

import { Subject } from '../../../../shared/models/subject.model'

export const LOAD = '[Study][Subject] LOAD'
export const LOAD_SUCCESS = '[Study][Subject] LOAD_SUCCESS'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Subject[]) {}
}

export type Actions = Load | LoadSuccess
