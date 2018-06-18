import * as actions from './compliance-data.actions'

export interface State {
  data: any
  isLoaded: boolean
}

const initialState: State = {
  data: [],
  isLoaded: false
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
        isLoaded: true,
        data: action.payload
      }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getData = (state: State) => state.data
