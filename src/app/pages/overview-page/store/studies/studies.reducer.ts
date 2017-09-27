import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../../tmp_modules/@ngrx/entity'
import { Study } from '../../models/study.model'
import * as actions from './studies.actions'

export interface State extends EntityState<Study> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Study> = createEntityAdapter<Study>()

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

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
