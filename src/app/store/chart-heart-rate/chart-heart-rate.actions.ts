import { Action } from '@ngrx/store';
import { type } from '../../shared/util';
import { HeartRate } from '../../models/chart-heart-rate.model';

export class Types {
  static readonly UPDATE         = type('[ChartHeartRate] Update');
  static readonly UPDATE_SUCCESS = type('[ChartHeartRate] Update Success');
}

export class Update implements Action {
  readonly type = Types.UPDATE;

  constructor(public payload: string) {}
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;

  constructor(public payload: HeartRate[]) {}
}

export type Actions
  = Update
  | UpdateSuccess;
