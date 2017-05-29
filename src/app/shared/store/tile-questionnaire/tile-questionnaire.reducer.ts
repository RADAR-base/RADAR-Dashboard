import { Categorical } from '../../models/categorical.model'
import * as questionnaireAction from './tile-questionnaire.actions'

export interface State {
  loading: boolean
  data: Categorical[]
  config: any
  request: any
}

const initialState: State = {
  loading: false,
  data: null,
  config: null,
  request: null
}

export function reducer (state = initialState, action: questionnaireAction.Actions): State {
  switch (action.type) {

    case questionnaireAction.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true,
        request: action.payload
      })
    }

    case questionnaireAction.Types.UPDATE_SUCCESS: {
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
