import { createSelector } from 'reselect'
import * as study from './study.actions'

export interface State {
  ids: string[]
  entities: { [id: string]: any }
  selectedId: string
  loading: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: '',
  loading: false
}

export function reducer (state = initialState, action: study.Actions): State {
  switch (action.type) {

    case study.Types.UPDATE: {
      return Object.assign({}, state, {
        loading: true
      })
    }

    case study.Types.UPDATE_SUCCESS: {
      const studies = action.payload
      const studyIds = studies.map(study => study.id)
      const studyEntities = studies.reduce((entities, study) => {
        return Object.assign(entities, {
          [study.id]: study
        })
      }, {})

      return Object.assign({}, state, {
        loading: false,
        ids: studyIds,
        entities: studyEntities
      })
    }

    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities
export const getSelectedId = (state: State) => state.selectedId
export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId]
})
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})
