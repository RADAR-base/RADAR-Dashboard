import { MultiTimeSeries } from '../../models/multi-time-series.model'
import * as acAction from './tile-acceleration.actions'

export interface State {
  loading: boolean
  data: MultiTimeSeries[]
  config: any
  request: any
}

const initialState: State = {
  loading: false,
  data: null,
  config: null,
  request: null
}

export function reducer (state = initialState, action: acAction.Actions): State {
  switch (action.type) {

    case acAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      })
    }

    case acAction.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        data: action.payload
      })
    }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getData = (state: State) => state.data
