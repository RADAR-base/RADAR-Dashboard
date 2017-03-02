import { Action } from '@ngrx/store'

import { type } from '../../utils/type'

export class Types {
  static readonly UPDATE = type('[Study] Update')
  static readonly UPDATE_SUCCESS = type('[Study] Update Success')
}

export class Update implements Action {
  readonly type = Types.UPDATE
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: any) {}
}

export type Actions
  = Update
  | UpdateSuccess
