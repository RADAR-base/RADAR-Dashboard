import { createSelector } from '@ngrx/store'

import * as sensorsActions from './sensors.actions'
import { Sensor } from './sensors.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Sensor }
  isLoaded: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
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
      let counter = 0
      const payload = action.payload
      const ids = []
      const sensors = payload.map(source =>
        source.sensors.reduce((acc, sensor) => {
          const id = counter++
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
        isLoaded: false
      }
    }

    case sensorsActions.TOGGLE_VISIBILITY: {
      const id = action.payload
      const entity = {
        ...state.entities[id],
        visible: !state.entities[id].visible
      }
      const entities = { ...state.entities, [id]: entity }

      return {
        ids: state.ids,
        entities: entities,
        isLoaded: state.isLoaded
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
