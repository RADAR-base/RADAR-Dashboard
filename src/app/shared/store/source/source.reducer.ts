import { createSelector } from 'reselect'

import * as sourceActions from './source.actions'
import { Source } from './source.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Source }
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  isLoaded: false
}

export function reducer (state = initialState, action: sourceActions.Actions): State {
  switch (action.type) {

    case sourceActions.GET_ALL: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case sourceActions.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(source => source.id)
      const entities = payload.reduce((acc, source) => {
        return { ...acc, [source.id]: source }
      }, {})

      return {
        ...state,
        isLoaded: true,
        ids,
        entities
      }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities

export const getAll = createSelector(
  getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id])
  })
