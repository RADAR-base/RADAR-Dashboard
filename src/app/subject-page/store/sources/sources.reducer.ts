import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { Source } from '../../../shared/models/source.model'
import * as actions from './sources.actions'

export interface State extends EntityState<Source> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Source> = createEntityAdapter<Source>()

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return { ...state, isLoaded: false }
    }

    case actions.LOAD_SUCCESS: {
      return { ...adapter.addAll(action.payload, state), isLoaded: true }
    }

    case actions.LOAD_FAIL:
    case actions.DESTROY: {
      return { ...initialState }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
