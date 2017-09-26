import { createSelector } from '@ngrx/store'

import { Study } from '../models/overview.model'
import * as overviewActions from './overview.actions'

export interface State {
  studies: { ids: string[]; byId: { [id: string]: Study } }
  studyLoaded: boolean
}

const initialState: State = {
  studies: { ids: [], byId: {} },
  studyLoaded: false
}

export function reducer(
  state = initialState,
  action: overviewActions.Actions
): State {
  switch (action.type) {
    case overviewActions.LOAD_STUDIES: {
      return Object.assign({}, state, {
        studyLoaded: false
      })
    }

    case overviewActions.LOAD_STUDIES_SUCCESS: {
      const payload = action.payload
      const ids = payload.map(study => study.id)
      const entities = payload.reduce((acc, study) => {
        return Object.assign(acc, { [study.id]: study })
      }, {})

      return Object.assign({}, state, {
        studyLoaded: true,
        studies: {
          ids: ids,
          byId: entities
        }
      })
    }

    default:
      return state
  }
}

export const getStudiesLoaded = (state: State) => state.studyLoaded
export const getStudiesIds = (state: State) => state.studies.ids
export const getStudiesById = (state: State) => state.studies.byId

export const getStudies = createSelector(
  getStudiesById,
  getStudiesIds,
  (entities, ids) => {
    return ids.map(id => entities[id])
  }
)
