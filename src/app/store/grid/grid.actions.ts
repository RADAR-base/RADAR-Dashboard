import { Action } from '@ngrx/store'
import { type } from '../../shared/util'
import { Tile } from '../../models/tile.model'

export class Types {
  static readonly LOAD = type('[Grid] Load')
  static readonly LOAD_SUCCESS = type('[Grid] Load Success')
}

export class Load implements Action {
  readonly type = Types.LOAD
}

export class LoadSuccess implements Action {
  readonly type = Types.LOAD_SUCCESS

  constructor (public payload: Tile[]) {}
}

export type Actions
  = Load
  | LoadSuccess
