import * as subjectAction from './subject.actions'

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

export function reducer (state = initialState, action: subjectAction.Actions): State {
  switch (action.type) {

    case subjectAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case subjectAction.Types.UPDATE_SUCCESS: {
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
