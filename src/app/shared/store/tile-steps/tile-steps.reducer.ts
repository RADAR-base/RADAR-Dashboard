import { TimeSeries } from '../../models/time-series.model'
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

export const getLoading = (state: State) => state.loading
export const getData = (state: State) => state.data
