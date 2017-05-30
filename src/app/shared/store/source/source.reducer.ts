import * as source from './source.actions'

export interface State {
  ids: string[]
  visibleIds: string[]
  entities: { [id: string]: any }
  selectedId: string
  isLoading: boolean
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  visibleIds: [],
  entities: {},
  selectedId: '',
  isLoading: false,
  isLoaded: false
}

export function reducer (state = initialState, action: source.Actions): State {
  switch (action.type) {

    case source.LOAD: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case source.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        isLoaded: true
      })
    }

    default:
      return state
  }
}

export const getIsLoading = (state: State) => state.isLoading
export const getIsLoaded = (state: State) => state.isLoaded
