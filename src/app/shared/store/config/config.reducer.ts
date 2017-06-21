import * as config from './config.actions'
import { Config } from './config.model'

export interface State extends Config {
  loading?: boolean
}

const initialState: State = {
  loading: false,
  stats: {},
  sensors: {},
  timeIntervals: {},
  units: {},
  specs: []
}

export function reducer (state = initialState, action: config.Actions): State {
  switch (action.type) {

    case config.LOAD: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case config.LOAD_SUCCESS: {
      return Object.assign({}, action.payload, {
        loading: false
      })
    }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
