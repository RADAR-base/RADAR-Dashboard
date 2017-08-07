import { createSelector } from 'reselect'

import * as compliance from './compliance.actions'

export interface State {
  ids: string[]
  entities: any
  selectedId: string
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: [],
  selectedId: '',
  isLoaded: false
}

export function reducer (state = initialState, action: compliance.Actions): State {
  switch (action.type) {

    case compliance.GET_ALL: {
      return Object.assign({}, state, {
        isLoaded: false
      })
    }

    case compliance.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = payload
      const entities = payload

      return Object.assign({}, state, {
        isLoaded: true,
        ids,
        entities
      })
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities
export const getSelectedId = (state: State) => state.selectedId

export const getIsLoadedAndValid = createSelector(
  getIsLoaded, getEntities, getSelectedId, (loaded, entities, selectedId) => {
    return loaded && !!entities[selectedId]
  })

export const getSelected = createSelector(
  getEntities, getSelectedId, (entities, selectedId) => {
    return selectedId
  })

export const getAll = createSelector(
  getEntities, getIds, (entities, ids) => {
    return entities
  })
