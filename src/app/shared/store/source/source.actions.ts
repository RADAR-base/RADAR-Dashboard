import { Action } from '@ngrx/store'

import { Source } from './source.model'

export const GET_ALL = '[Source] GET_ALL'
export const GET_ALL_SUCCESS = '[Source] GET_ALL_SUCCESS'
export const DESTROY = '[Source] DESTROY'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: string) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: Source[]) {}
}

export class Destroy implements Action {
  readonly type = DESTROY
}

export type Actions = GetAll | GetAllSuccess | Destroy
