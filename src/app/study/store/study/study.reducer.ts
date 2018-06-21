import { createSelector } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'
import * as actions from './study.actions'

export interface State {
  isLoaded: boolean
  selected: Study
}

const initialState: State = {
  isLoaded: true,
  selected: null
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD:
      return { ...state, isLoaded: false }

    case actions.LOAD_SUCCESS:
      return {
        ...state,
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
export const getSelected = (state: State) => state.selected