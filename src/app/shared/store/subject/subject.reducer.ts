import { createSelector } from 'reselect'
import * as subject from './subject.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: any }
  selectedId: string
  isLoading: boolean,
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: '',
  isLoading: false,
  isLoaded: false
}

export function reducer (state = initialState, action: subject.Actions): State {
  switch (action.type) {

    case subject.LOAD: {
      return Object.assign({}, state, {
        isLoading: true
      })
    }

    case subject.LOAD_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(subject => subject.id)
      const entities = payload.reduce((accumulator, subject) => {
        return Object.assign(accumulator, { [subject.id]: subject })
      }, {})

      return Object.assign({}, state, {
        isLoading: false,
        isLoaded: true,
        ids,
        entities
      })
    }

    default:
      return state
  }
}

export const getIsLoading = (state: State) => state.isLoading
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
