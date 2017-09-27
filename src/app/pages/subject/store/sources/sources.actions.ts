import { Action } from '@ngrx/store'

import { Source } from '../../models/subject.model'

export const LOAD = '[Source] LOAD'
export const LOAD_SUCCESS = '[Source] LOAD_SUCCESS'
export const DESTROY = '[Source] DESTROY'

export class Load implements Action {
  readonly type = LOAD

  constructor(public payload: string) {}
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS

  constructor(public payload: Source[]) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = Load | LoadSuccess | Destroy
