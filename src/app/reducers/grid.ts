import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import * as grid from '../actions/grid';
import { Tile } from '../models/tile';

export interface State {
  loaded: boolean;
  loading: boolean;
  tiles: Tile[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  tiles: []
};

export function reducer(state = initialState, action: grid.Actions): State {
  switch (action.type) {

    case grid.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case grid.ActionTypes.LOAD_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        tiles: action.payload
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

export function getTiles(state$: Observable<State>) {
  return state$.select(s => s.tiles);
}
