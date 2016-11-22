import { Action } from '@ngrx/store';
import { type } from '../shared/util';
import { Tile } from '../models/tile';

export const ActionTypes = {
  LOAD:         type('[Grid] Load'),
  LOAD_SUCCESS: type('[Grid] Load Success'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Tile[]) {}
}

export type Actions
  = LoadAction
  | LoadSuccessAction;
