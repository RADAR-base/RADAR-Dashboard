import { Action } from '@ngrx/store'

import { Categorical } from '../../../components/dashboard-tile/models/categorical.model'
import { type } from '../../utils/type'

export class Types {
  static readonly UPDATE = type('[TileQuestionnaire] Update')
  static readonly UPDATE_SUCCESS = type('[TileQuestionnaire] Update Success')
}

export class Update implements Action {
  readonly type = Types.UPDATE

  constructor (public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS

  constructor (public payload: Categorical[]) {}
}

export type Actions
  = Update
  | UpdateSuccess
