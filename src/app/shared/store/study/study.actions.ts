import { Action } from '@ngrx/store'

import { type } from '../../utils/type'
import { Study } from './study.model'

export class Types {
  static readonly UPDATE = type('[Study] Update')
  static readonly UPDATE_SUCCESS = type('[Study] Update Success')
  static readonly SELECT = type('[Study] Select')
}

export class Update implements Action {
  readonly type = Types.UPDATE
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: Study[]) {}
}

export class Select implements Action {
  readonly type = Types.SELECT

  constructor (public payload: string) {}
}

export type Actions
  = Update
  | UpdateSuccess
  | Select
