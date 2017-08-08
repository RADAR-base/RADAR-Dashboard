import { createSelector } from '@ngrx/store'
import * as uuid from 'uuid/v4'

import * as sensorsActions from './sensors.actions'
import { Sensor } from './sensors.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Sensor }
  visible: string[]
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  visible: [],
  isLoaded: false
}

export function reducer(
  state = initialState,
  action: sensorsActions.Actions
): State {
  switch (action.type) {
    case sensorsActions.GET_ALL: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case sensorsActions.GET_ALL_SUCCESS: {
      const payload = action.payload
      const ids = []
      const sensors = payload.map(source =>
        source.sensors.reduce((acc, sensor) => {
          const id = uuid()
          ids.push(id)

          const sensorWithId = {
            ...sensor,
            visible: true,
            source: source.id,
            id
          }

          return { ...acc, [id]: sensorWithId }
        }, {})
      )
      const entities = sensors.reduce((acc, sensor) => {
        return { ...acc, ...sensor }
      }, {})

      return {
        ...state,
        isLoaded: true,
        ids,
        entities
      }
    }

    case sensorsActions.DESTROY: {
      return {
        ids: [],
        entities: {},
        visible: [],
        isLoaded: false
      }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})
