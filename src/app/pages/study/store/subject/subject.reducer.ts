import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../../tmp_modules/@ngrx/entity'
import { Subject } from '../../../../shared/models/subject.model'
import * as subjectActions from './subject.actions'

export interface State extends EntityState<Subject> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Subject> = createEntityAdapter<Subject>()

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(
  state = initialState,
  action: subjectActions.Actions
): State {
  switch (action.type) {
    case subjectActions.LOAD: {
      return { ...state, isLoaded: false }
    }

    case subjectActions.LOAD_SUCCESS: {
      return { ...adapter.addAll(action.payload, state), isLoaded: true }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
