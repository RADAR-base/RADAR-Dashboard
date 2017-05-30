import { Action } from '@ngrx/store'

export const UPDATE = '[Subject] Update'
export const UPDATE_SUCCESS = '[Subject] Update Success'

export class Update implements Action {
  readonly type = UPDATE

  constructor (public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS

  constructor (public payload: any) {}
}

export type Actions
  = Update
  | UpdateSuccess
