import { createSelector } from '@ngrx/store'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeSeries } from '../../models/time-series.model'
import * as sensorsActions from './sensors.actions'
import { Sensor } from './sensors.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Sensor }
  isLoaded: boolean
  data: { [id: number]: TimeSeries[] | MultiTimeSeries[] }
  isDataLoaded: { [id: number]: boolean }
}

const initialState: State = {
  ids: [],
  entities: {},
  isLoaded: false,
  data: {},
  isDataLoaded: {}
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
      const payload = action.payload.data
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

    case sensorsActions.GET_ALL_DATA: {
      return {
        ...state,
        isDataLoaded: []
      }
    }

    case sensorsActions.GET_ALL_DATA_SUCCESS: {
      const payload = action.payload
      const id = payload.id
      const data = payload.data
      const dataWithIds = { ...state.data, [id]: data }

      return {
        ...state,
        data: dataWithIds,
        isDataLoaded: { ...state.isDataLoaded, [id]: true }
      }
    }

    case sensorsActions.DESTROY: {
      return {
        ids: [],
        entities: {},
        data: {},
        isLoaded: false,
        isDataLoaded: {}
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
        ...state,
        entities: entities
      }
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIsDataLoaded = (state: State) => state.isDataLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities
export const getData = (state: State) => state.data

export const getLabels = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map(id => entities[id].label)
  }
)

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})

export const getAllData = createSelector(getData, getIds, (data, ids) => {
  return ids.map(id => data[id])
})
