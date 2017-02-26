import { Action } from '@ngrx/store'

import { DashboardTile } from '../../../components/dashboard-tile/dashboard-tile.model'
import { type } from '../../utils/type'

export class Types {
  static readonly LOAD = type('[Grid] Load')
  static readonly LOAD_SUCCESS = type('[Grid] Load Success')
}

export class Load implements Action {
  readonly type = Types.LOAD
}

export class LoadSuccess implements Action {
  readonly type = Types.LOAD_SUCCESS

  constructor (public payload: DashboardTile[]) {}
}

export type Actions
  = Load
  | LoadSuccess
