import { createSelector } from 'reselect'

import * as sensors from './sensors.actions'
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

export function reducer (state = initialState, action: sensors.Actions): State {
  switch (action.type) {

    case sensors.GET_ALL: {
      console.log('sensors.GET_ALL', action)
      return {
        ...state,
        isLoaded: false
      }
    }

    case sensors.GET_ALL_SUCCESS: {
      const payload = action.payload
      console.log('sensors.GET_ALL_SUCCESS', payload)
      // const ids = payload.map(source => source.id)
      // const entities = payload.reduce((accumulator, source) => {
      //   return { ...accumulator, [source.id]: source }
      // }, {})
      // console.log(entities)
      // return {
      //   ...state,
      //   isLoaded: true,
      //   ids,
      //   entities
      // }

      return state
    }

    default:
      return state
  }
}

export const getIsLoaded = (state: State) => state.isLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities

export const getAll = createSelector(
  getEntities, getIds, (entities, ids) => {
    return ids.map(id => entities[id])
  })
