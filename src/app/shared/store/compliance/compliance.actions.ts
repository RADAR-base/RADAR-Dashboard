import { Action } from '@ngrx/store'

export const GET_ALL = '[Compliance] GET_ALL'
export const GET_ALL_SUCCESS = '[Compliance] GET_ALL_SUCCESS'
export const GET_SELECTED = '[Compliance] GET_SELECTED'
export const GET_SELECTED_SUCCESS = '[Compliance] GET_SELECTED_SUCCESS'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor (public payload: any) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor (public payload: any) {}
}

export class GetSelected implements Action {
  readonly type = GET_SELECTED

  constructor (public payload: any) {}
}

export class GetSelectedSuccess implements Action {
  readonly type = GET_SELECTED_SUCCESS

  constructor (public payload: any) {}
}

export type Actions
  = GetAll
  | GetAllSuccess
  | GetSelected
  | GetSelectedSuccess
