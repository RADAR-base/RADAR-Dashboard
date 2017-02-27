import { Action } from '@ngrx/store'

import { type } from '../../utils/type'
import { Config } from './config.model'

export class Types {
  static readonly LOAD = type('[Config] Load')
  static readonly LOAD_SUCCESS = type('[Config] Load Success')
}

export class Load implements Action {
  readonly type = Types.LOAD
}

export class LoadSuccess implements Action {
  readonly type = Types.LOAD_SUCCESS

  constructor (public payload: Config) {}
}

export type Actions
  = Load
  | LoadSuccess
