import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'
import { createSelector } from '@ngrx/store'

import { Study } from '../../models/overview.model'
import * as studyActions from './study.actions'

export interface State extends EntityState<Study> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Study> = createEntityAdapter<Study>()

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(
  state = initialState,
  action: studyActions.Actions
): State {
  switch (action.type) {
    case studyActions.LOAD_STUDIES: {
      return { ...state, isLoaded: false }
    }

    case studyActions.LOAD_STUDIES_SUCCESS: {
      return { ...adapter.addAll(action.payload, state), isLoaded: true }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
