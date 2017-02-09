import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { MultiTimeSeries } from '../../models/multi-time-series.model';
import * as acAction from './chart-acceleration.actions';

export interface State {
  loading: boolean;
  data: MultiTimeSeries[];
  config: any;
  request: any;
}

const initialState: State = {
  loading: false,
  data: null,
  config: null,
  request: null,
};

export function reducer(state = initialState, action: acAction.Actions): State {
  switch (action.type) {

    case acAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      });
    }

    case acAction.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        data: action.payload
      });
    }

    default:
      return state;
  }
}

export function getLoading(state$: Observable<State>) {
  return state$.select(s => s.loading);
}

export function getData(state$: Observable<State>) {
  return state$.select(s => s.data);
}
