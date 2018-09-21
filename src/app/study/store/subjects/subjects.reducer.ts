import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { Subject } from '../../../shared/models/subject.model'
import * as actions from './subjects.actions'

export interface State extends EntityState<Subject> {
  isLoaded: boolean
}

export const adapter: EntityAdapter<Subject> = createEntityAdapter<Subject>({
  selectId: (subject: Subject) => subject.subjectId
})

export const initialState: State = adapter.getInitialState({
  isLoaded: false
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD:
    case actions.LOAD_FAIL: {
      return initialState
    }

    case actions.LOAD_SUCCESS: {
      return { ...adapter.addAll(action.payload, state), isLoaded: true }
    }

    case actions.DESTROY: {
      return initialState
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
