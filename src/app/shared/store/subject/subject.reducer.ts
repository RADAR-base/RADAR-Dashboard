import { createSelector } from '@ngrx/store'

import * as subjectActions from './subject.actions'
import { Subject } from './subject.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Subject }
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
  action: subjectActions.Actions
): State {
  switch (action.type) {
    case subjectActions.GET_ALL: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case subjectActions.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(subject => subject.subjectId)
      const entities = payload.reduce((acc, subject) => {
        return { ...acc, [subject.subjectId]: subject }
      }, {})

      return {
        ...state,
        isLoaded: true,
        ids,
        entities
      }
    }

    case subjectActions.SET_SELECTED_ID: {
      return {
        ...state,
        selectedId: action.payload
      }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities
export const getSelectedId = (state: State) => state.selectedId

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
