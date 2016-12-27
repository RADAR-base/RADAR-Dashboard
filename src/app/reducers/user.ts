import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as userAction from '../actions/user';
import { User } from '../models/user.model';

export interface State extends User {
  loaded: boolean;
  loading: boolean;
  id: string;
  lastUpdate: string;
}

const initialState: State = {
  loaded: false,
  loading: false,
  id: null,
  lastUpdate: null
};

export function reducer(state = initialState, action: userAction.Actions): State {
  switch (action.type) {

    case userAction.Types.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case userAction.Types.LOAD_SUCCESS: {
      const user: User = action.payload;

      return {
        loading: false,
        loaded: true,
        id: user.id,
        lastUpdate: user.lastUpdate
      };
    }

    default:
      return state;
  }
}

export function getLoaded(state$: Observable<State>) {
  return state$.select(s => s.loaded);
}

export function getLoading(state$: Observable<State>) {
  return state$.select(s => s.loading);
}

export function getUserID(state$: Observable<State>) {
  return state$.select(s => s.id);
}
