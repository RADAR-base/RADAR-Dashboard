import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../../tmp_modules/@ngrx/entity'
import { Source } from '../../models/subject.model'
import * as sourcesActions from './sources.actions'

export interface State extends EntityState<Source> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Source> = createEntityAdapter<Source>()

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(
  state = initialState,
  action: sourcesActions.Actions
): State {
  switch (action.type) {
    case sourcesActions.LOAD: {
      return { ...state, isLoaded: false }
    }

    case sourcesActions.LOAD_SUCCESS: {
      return { ...adapter.addAll(action.payload, state), isLoaded: true }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
