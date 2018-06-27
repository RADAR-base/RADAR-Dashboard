import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { SourceType } from '../../../shared/models/source-type.model'
import {
  SourceTypeActionTypes,
  SourceTypeActions
} from './source-types.actions'

export interface State extends EntityState<SourceType> {
  // additional entities state properties
}

export const adapter: EntityAdapter<SourceType> = createEntityAdapter<
  SourceType
>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
})

export function reducer(
  state = initialState,
  action: SourceTypeActions
): State {
  switch (action.type) {
    case SourceTypeActionTypes.LoadFromApiSuccess: {
      return adapter.addAll(action.payload, state)
    }

    case SourceTypeActionTypes.LoadFail: {
      return initialState
    }

    default: {
      return state
    }
  }
}
