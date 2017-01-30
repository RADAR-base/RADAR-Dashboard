import { Action } from '@ngrx/store';
import { type } from '../../shared/util';
import { MultiTimeSeries } from '../../models/multi-time-series.model';

export class Types {
  static readonly UPDATE         = type('[ChartAcceleration] Update');
  static readonly UPDATE_SUCCESS = type('[ChartAcceleration] Update Success');
}

export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public payload: MultiTimeSeries[]) {}
}

export type Actions
  = Update
  | UpdateSuccess;
