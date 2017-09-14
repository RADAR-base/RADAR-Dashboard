import { createSelector } from '@ngrx/store'

import * as studyActions from './study.actions'
import { Study } from './study.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Study }
  selectedId: string
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: '',
  isLoaded: false
}

export function reducer(
  state = initialState,
  action: studyActions.Actions
): State {
  switch (action.type) {
    case studyActions.GET_ALL:
    case studyActions.GET_BY_ID: {
      return Object.assign({}, state, {
        isLoaded: false
      })
    }

    case studyActions.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(study => study.id)
      const entities = payload.reduce((acc, study) => {
        return Object.assign(acc, { [study.id]: study })
      }, {})

      return Object.assign({}, state, {
        isLoaded: true,
        ids,
        entities
      })
    }

    case studyActions.GET_BY_ID_SUCCESS: {
      const payload = action.payload
      let index
      let ids
      let entities
      let entity
      let selectedId

      if (payload && payload.id) {
        index = state.ids.findIndex(id => id === payload.id.toString())
        ids = index > -1 ? [...state.ids] : [...state.ids, payload.id]
        entity = { [payload.id]: payload }
        entities = Object.assign({}, state.entities, entity)
        selectedId = payload.id
      } else {
        ids = [...state.ids]
        entities = Object.assign({}, state.entities)
        selectedId = ''
      }

      return Object.assign({}, state, {
        isLoaded: true,
        selectedId,
        ids,
        entities
      })
    }

    case studyActions.SET_SELECTED_ID: {
      return Object.assign({}, state, {
        selectedId: action.payload
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
  getIsLoaded,
  getEntities,
  getSelectedId,
  (loaded, entities, selectedId) => {
    return loaded && !!entities[selectedId]
  }
)

export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return entities[selectedId]
  }
)

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})
