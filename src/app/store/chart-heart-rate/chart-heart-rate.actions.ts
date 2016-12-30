import { Action } from '@ngrx/store';
import { type } from '../../shared/util';

export const Types = {
  UPDATE:         type('[ChartHeartRate] Update'),
  UPDATE_SUCCESS: type('[ChartHeartRate] Update Success'),
};

export class Update implements Action {
  type = Types.UPDATE;

  constructor(public payload) {}
}

export class UpdateSuccess implements Action {
  type = Types.UPDATE_SUCCESS;

  constructor(public payload) {}
}

export type Actions
  = Update
  | UpdateSuccess;
