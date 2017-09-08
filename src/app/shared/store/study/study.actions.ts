import { Action } from '@ngrx/store'

import { Study } from './study.model'

export const GET_ALL = '[Study] GET_ALL'
export const GET_ALL_SUCCESS = '[Study] GET_ALL_SUCCESS'
export const GET_BY_ID = '[Study] GET_BY_ID'
export const GET_BY_ID_SUCCESS = '[Study] GET_BY_ID_SUCCESS'
export const SET_SELECTED_ID = '[Study] SET_SELECTED_ID'

export class GetAll implements Action {
  readonly type = GET_ALL
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: Study[]) {}
}

export class GetById implements Action {
  readonly type = GET_BY_ID

  constructor(public payload: string) {}
}

export class GetByIdSuccess implements Action {
  readonly type = GET_BY_ID_SUCCESS

  constructor(public payload: Study) {}
}

export class SetSelectedId implements Action {
  readonly type = SET_SELECTED_ID

  constructor(public payload: string) {}
}

export type Actions =
  | GetAll
  | GetAllSuccess
  | GetById
  | GetByIdSuccess
  | SetSelectedId
