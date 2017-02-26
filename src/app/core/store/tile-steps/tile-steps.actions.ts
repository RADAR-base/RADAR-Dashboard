import { Action } from '@ngrx/store'

import { TimeSeries } from '../../../components/dashboard-tile/models/time-series.model'
import { type } from '../../utils/type'

export class Types {
  static readonly UPDATE = type('[TileSteps] Update')
  static readonly UPDATE_SUCCESS = type('[TileSteps] Update Success')
}

export class Update implements Action {
  readonly type = Types.UPDATE

  constructor (public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: TimeSeries[]) {}
}

export type Actions
  = Update
  | UpdateSuccess
