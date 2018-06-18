import { createSelector } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'
import * as actions from './study.actions'

export interface State {
  isLoaded: boolean
  id: string
  selected: Study
}

const initialState: State = {
  isLoaded: true,
  id: '',
  selected: null
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD:
      return { ...state, isLoaded: false }

    case actions.LOAD_SUCCESS:
      return {
        ...state,
        id: action.payload.projectName,
        selected: action.payload,
        isLoaded: true
      }

    case actions.LOAD_FAIL:
      return { ...initialState }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getId = (state: State) => state.id
export const getSelected = (state: State) => state.selected

export const getIsLoadedAndValid = createSelector(
  getIsLoaded,
  getSelected,
  getId,
  (loaded, study, id) => {
    return loaded && !!study && !!id
  }
)
