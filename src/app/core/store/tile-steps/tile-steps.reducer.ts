import '@ngrx/core/add/operator/select'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../components/dashboard-tile/models/time-series.model'
import * as stepsAction from './tile-steps.actions'

export interface State {
  loading: boolean
  data: TimeSeries[]
  config: any
  request: any
}

const initialState: State = {
  loading: false,
  data: null,
  config: null,
  request: null
}

export function reducer (state = initialState, action: stepsAction.Actions): State {
  switch (action.type) {

    case stepsAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      })
    }

    case stepsAction.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        data: action.payload
      })
    }

    default:
      return state
  }
}

export function getLoading (state$: Observable<State>) {
  return state$.select(s => s.loading)
}

export function getData (state$: Observable<State>) {
  return state$.select(s => s.data)
}
