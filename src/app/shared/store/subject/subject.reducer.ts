import * as subject from './subject.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: any }
  selectedId: string
  isLoading: boolean
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: '',
  isLoading: false,
  isLoaded: false
}

export function reducer (state = initialState, action: subject.Actions): State {
  switch (action.type) {

    case subject.LOAD: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case subject.LOAD_SUCCESS: {
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
