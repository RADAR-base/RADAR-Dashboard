import { Action } from '@ngrx/store'

export const GET_ALL = '[Compliance] GET_ALL'
export const GET_ALL_SUCCESS = '[Compliance] GET_ALL_SUCCESS'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: any) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: any) {}
}

export type Actions = GetAll | GetAllSuccess
