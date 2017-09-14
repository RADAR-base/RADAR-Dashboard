import { Action } from '@ngrx/store'

import { Subject } from './subject.model'

export const GET_ALL = '[Subject] GET_ALL'
export const GET_ALL_SUCCESS = '[Subject] GET_ALL_SUCCESS'
export const SET_SELECTED_ID = '[Subject] SET_SELECTED_ID'

export class GetAll implements Action {
  readonly type = GET_ALL

  constructor(public payload: string) {}
}

export class GetAllSuccess implements Action {
  readonly type = GET_ALL_SUCCESS

  constructor(public payload: Subject[]) {}
}

export class SetSelectedId implements Action {
  readonly type = SET_SELECTED_ID

  constructor(public payload: string) {}
}

export type Actions = GetAll | GetAllSuccess | SetSelectedId
