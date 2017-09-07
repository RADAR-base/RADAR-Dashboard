import { createSelector } from '@ngrx/store'

import { MultiTimeSeries } from '../../models/multi-time-series.model'
import { TimeFrame } from '../../models/time-frame.model'
import { TimeSeries } from '../../models/time-series.model'
import * as sensorsActions from './sensors.actions'
import { Sensor } from './sensors.model'

export interface State {
  ids: string[]
  entities: { [id: string]: Sensor }
  isLoaded: boolean
  data: { [id: number]: TimeSeries[] | MultiTimeSeries[] }
  dataLoaded: { [id: number]: boolean }
  dates: number[]
  tooltipIndex: number
  timeFrame: TimeFrame
  pristine: boolean
}

const initialState: State = {
  ids: [],
  entities: {},
  isLoaded: false,
  data: {},
  dataLoaded: {},
  dates: [],
  tooltipIndex: -1,
  timeFrame: { start: null, end: null },
  pristine: true
}

export function reducer(
  state = initialState,
  action: sensorsActions.Actions
): State {
  switch (action.type) {
    case sensorsActions.GET_ALL: {
      return {
        ...state,
        isLoaded: false,
        pristine: false
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

    case sensorsActions.GET_ALL_DATA: {
      return {
        ...state,
        dataLoaded: {}
      }
    }

    case sensorsActions.GET_ALL_DATA_SUCCESS: {
      // const payload = action.payload
      // const id = payload.id
      // const data = action.payload

      // console.table(action.payload)

      // const sensorData = {}

      // if (data[0]) {
      //   dataWithIds = { ...state.data['values'], [id]: data.map(d =>
      // d.value) } } else { dataWithIds = { ...state.data['values'], [id]: {
      // keys: data.keys, values: data.values } } }  let dataWithDates = {} if
      // (state.data['dates']) { dataWithDates = { dates: state.data['dates'],
      // values: dataWithIds } } else { const dates = data.map(d => d.date)
      // dataWithDates = { dates: dates, values: dataWithIds } }

      return {
        ...state
        // data: dataWithDates,
        // dataLoaded: { ...state.dataLoaded, [id]: true }
      }
    }

    case sensorsActions.SET_TIME_FRAME: {
      return {
        ...state,
        timeFrame: action.payload
      }
    }

    case sensorsActions.DESTROY: {
      return {
        ...initialState
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
export const getIsDataLoaded = (state: State) => state.dataLoaded
export const getIds = (state: State) => state.ids
export const getEntities = (state: State) => state.entities
export const getData = (state: State) => state.data
export const getPristine = (state: State) => state.pristine
export const getTimeFrame = (state: State) => state.timeFrame

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
  return data
})
