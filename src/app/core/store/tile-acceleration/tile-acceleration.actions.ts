import { Action } from '@ngrx/store'
import { MultiTimeSeries } from '../../../components/dashboard-tile/models/multi-time-series.model'

import { type } from '../../utils/type'

export class Types {
  static readonly UPDATE = type('[TileAcceleration] Update')
  static readonly UPDATE_SUCCESS = type('[TileAcceleration] Update Success')
}

export class Update implements Action {
  readonly type = Types.UPDATE

  constructor (public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: MultiTimeSeries[]) {}
}

export type Actions
  = Update
  | UpdateSuccess
