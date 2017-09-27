import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../tmp_modules/@ngrx/entity'
import { createSelector } from '@ngrx/store'

import { Study } from '../../models/study.model'
import * as studyActions from './study.actions'

export interface State extends EntityState<Study> {
  isLoaded: boolean
  id: string
  selected: Study
}

export const adapter: EntityAdapter<Study> = createEntityAdapter<Study>({
  selectId: (study: Study) => study.id
})

export const initialState: State = adapter.getInitialState({
  isLoaded: false,
  id: '',
  selected: null
})

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
        ...adapter.addOne(action.payload, state),
        selected: state.selected,
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
export const getSelectedId = (state: State) => state.id
