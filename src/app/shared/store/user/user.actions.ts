import { Action } from '@ngrx/store'

import { type } from '../../utils/type'
import { User } from './user.model'

export class Types {
  static readonly LOAD = type('[User] Load')
  static readonly LOAD_SUCCESS = type('[User] Load Success')
}

export class Load implements Action {
  readonly type = Types.LOAD
}

export class LoadSuccess implements Action {
  readonly type = Types.LOAD_SUCCESS

  constructor (public payload: User) {}
}

export type Actions
  = Load
  | LoadSuccess
