import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../models/config.model';
import * as configAction from './config.actions';

export interface State extends Config {
  loading: boolean;
}

const initialState: State = {
  loading: false,
  descriptive_statistic: []
};

export function reducer(state = initialState, action: configAction.Actions): State {
  switch (action.type) {

    case configAction.Types.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case configAction.Types.LOAD_SUCCESS: {
      let payload: Config = action.payload;
      return {
        loading: false,
        descriptive_statistic: payload.descriptive_statistic
      };
    }

    default:
      return state;
  }
}

export function getLoading(state$: Observable<State>) {
  return state$.select(s => s.loading);
}

export function getDescriptiveStatistic(state$: Observable<State>) {
  return state$.select(s => s.descriptive_statistic);
}
