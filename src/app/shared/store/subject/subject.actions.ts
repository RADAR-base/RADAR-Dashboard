import { Action } from '@ngrx/store'

import { type } from '../../utils/type'

export class Types {
  static readonly UPDATE = type('[Patient] Update')
  static readonly UPDATE_SUCCESS = type('[Patient] Update Success')
}

export class Update implements Action {
  readonly type = Types.UPDATE

  constructor (public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: any) {}
}

export type Actions
  = Update
  | UpdateSuccess
