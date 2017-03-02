import { TimeSeries } from '../../models/time-series.model'
import * as hrAction from './tile-heart-rate.actions'

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

export function reducer (state = initialState, action: hrAction.Actions): State {
  switch (action.type) {

    case hrAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      })
    }

    case hrAction.Types.UPDATE_SUCCESS: {
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
