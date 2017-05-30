import { createSelector } from 'reselect'
import * as study from './study.actions'

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

export function reducer (state = initialState, action: study.Actions): State {
  switch (action.type) {

    case study.UPDATE: {
      return Object.assign({}, state, {
        isLoading: true
      })
    }

    case study.UPDATE_SUCCESS: {
      const payload = action.payload
      const studyIds = payload.map(study => study.id)
      const studyEntities = payload.reduce((entities, study) => {
        return Object.assign(entities, { [study.id]: study })
      }, {})

      return Object.assign({}, state, {
        isLoading: false,
        isLoaded: true,
        ids: studyIds,
        entities: studyEntities
      })
    }

    case study.SELECT: {
      return Object.assign({}, state, {
        selectedId: action.payload
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
