import { createSelector } from 'reselect'

import * as subjectTable from './subject-table.actions'

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

export function reducer (state = initialState, action: subjectTable.Actions): State {
  switch (action.type) {

    case subjectTable.GET_ALL: {
      return Object.assign({}, state, {
        isLoaded: false
      })
    }

    case subjectTable.GET_ALL_SUCCESS: {
      const payload = action.payload
      const tempEntity = []
      const tempId = []

      try {
        tempEntity.push({id: payload.id, state: payload.summary.state})
        tempId.push(payload.id)
      } catch (e) {}

      const ids = state.ids.concat(tempId)

      // Getting it in the proper format (id:entity) is difficult with duplicate ids
      let entities = state.entities.concat(tempEntity)
      const tempEntities = entities.reduce((acc, status) => {
        return Object.assign(acc, { [status.id]: status })
      }, {})
      entities = (Object.assign(entities,tempEntities))

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
    return entities
  })
