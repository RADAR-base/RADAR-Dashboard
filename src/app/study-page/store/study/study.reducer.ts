import { createSelector } from '@ngrx/store'

import { Study } from '../../../shared/models/study.model'
import * as studyActions from './study.actions'

export interface State {
  isLoaded: boolean
  id: string
  selected: Study
}

const initialState: State = {
  isLoaded: false,
  id: '',
  selected: null
}

export function reducer(
  state = initialState,
  action: studyActions.Actions
): State {
  switch (action.type) {
    case studyActions.LOAD_STUDY_BY_ID: {
      return { ...state, isLoaded: false }
    }

    case studyActions.LOAD_STUDY_BY_ID_SUCCESS: {
      return {
        ...state,
        selected: action.payload,
        isLoaded: true
      }
    }

    case studyActions.SET_STUDY_ID: {
      return { ...state, id: action.payload }
    }

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
