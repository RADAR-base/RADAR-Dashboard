import { Action } from '@ngrx/store';
import { type } from '../../shared/util';
import { Tile } from '../../models/tile.model';

export const Types = {
  LOAD:         type('[Grid] Load'),
  LOAD_SUCCESS: type('[Grid] Load Success'),
};

export class Load implements Action {
  type = Types.LOAD;
}

export class LoadSuccess implements Action {
  type = Types.LOAD_SUCCESS;

  constructor(public payload: Tile[]) {}
}

export type Actions
  = Load
  | LoadSuccess;
