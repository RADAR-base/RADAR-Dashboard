import { Action } from '@ngrx/store';
import { type } from '../shared/util';
import { User } from '../models/user.model';

export const Types = {
  LOAD:         type('[User] Load'),
  LOAD_SUCCESS: type('[User] Load Success'),
};

export class Load implements Action {
  type = Types.LOAD;
}

export class LoadSuccess implements Action {
  type = Types.LOAD_SUCCESS;

  constructor(public payload: User) {}
}

export type Actions
  = Load
  | LoadSuccess;
