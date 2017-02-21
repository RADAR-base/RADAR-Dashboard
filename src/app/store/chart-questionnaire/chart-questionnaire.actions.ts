import { Action } from '@ngrx/store';
import { type } from '../../shared/util';
import { Categorical } from '../../models/categorical.model';

export class Types {
  static readonly UPDATE         = type('[ChartQuestionnaire] Update');
  static readonly UPDATE_SUCCESS = type('[ChartQuestionnaire] Update Success');
}

export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public payload: Categorical[]) {}
}

export type Actions
  = Update
  | UpdateSuccess;
