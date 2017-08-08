import { Action } from '@ngrx/store'
import { Source } from './source.model'

export const GET_ALL = '[Source] GET_ALL'
export const GET_ALL_SUCCESS = '[Source] Load GET_ALL_SUCCESS'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: string) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: Source[]) {}
}

export type Actions = GetAll | GetAllSuccess
