import { createSelector } from 'reselect'

import * as subject from './subject.actions'
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

export function reducer (state = initialState, action: subject.Actions): State {
  switch (action.type) {

    case subject.GET_ALL: {
      return Object.assign({}, state, {
        isLoaded: false
      })
    }

    case subject.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(subject => subject.subjectId)
      const entities = payload.reduce((accumulator, subject) => {
        return Object.assign(accumulator, { [subject.subjectId]: subject })
      }, {})

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

export const getSelected = createSelector(
  getEntities, getSelectedId, (entities, selectedId) => {
    return entities[selectedId]
  })

export const getAll = createSelector(
  getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id])
  })
