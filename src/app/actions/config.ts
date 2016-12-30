import { Action } from '@ngrx/store';
import { type } from '../shared/util';
import { Config } from '../models/config.model';

export const Types = {
  LOAD:         type('[Config] Load'),
  LOAD_SUCCESS: type('[Config] Load Success'),
};

export class Load implements Action {
  type = Types.LOAD;
}

export class LoadSuccess implements Action {
  type = Types.LOAD_SUCCESS;

  constructor(public payload: Config) {}
}

export type Actions
  = Load
  | LoadSuccess;
