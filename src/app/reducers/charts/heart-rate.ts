import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { HeartRate } from '../../models/charts/heart-rate';
import * as hrAction from '../../actions/charts/heart-rate';

export interface State {
  loaded: boolean;
  loading: boolean;
  data: HeartRate[];
  config: any;
  request: any;
}

const initialState: State = {
  loaded: false,
  loading: false,
  data: null,
  config: null,
  request: null,
};

export function reducer(state = initialState, action: hrAction.Actions): State {
  switch (action.type) {

    case hrAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      });
    }

    case hrAction.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        data: action.payload
      });
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

export function getData(state$: Observable<State>) {
  return state$.select(s => s.data);
}
