import * as actions from './compliance-data.actions'

export interface State {
  data: any
  isLoaded: boolean
  timeFrame: any
}

const initialState: State = {
  data: [],
  isLoaded: false,
  timeFrame: '30 days'
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case actions.LOAD_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        data: action.payload
      }
    }

    case actions.SET_TIME_FRAME: {
      return {
        ...state,
        timeFrame: action.payload
      }
    }

    case actions.DESTROY: {
      return initialState
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getData = (state: State) => state.data
export const getTimeFrame = (state: State) => state.timeFrame
