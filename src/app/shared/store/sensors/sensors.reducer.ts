import { createSelector } from '@ngrx/store'

import { ChartData } from '../../models/chart-data.model'
import { DescriptiveStatistic } from '../../models/descriptive-statistic.enum'
import { TimeFrame } from '../../models/time-frame.model'
import { TimeInterval } from '../../models/time-interval.enum'
import { roundToNearest } from '../../utils/round-to-nearest'
import * as actions from './sensors.actions'
import { Sensor } from './sensors.model'

export interface State {
  ids: number[]
  entities: { [id: string]: Sensor }
  isLoaded: boolean
  data: { [id: number]: ChartData[] }
  dataLoaded: { [id: number]: boolean }
  dates: Date[]
  tooltipDate: Date
  timeFrame: TimeFrame
  timeInterval: TimeInterval
  descriptiveStatistic: DescriptiveStatistic
}

const initialState: State = {
  ids: [],
  entities: {},
  isLoaded: false,
  data: {},
  dataLoaded: {},
  dates: [],
  tooltipDate: null,
  timeFrame: { start: null, end: null },
  timeInterval: TimeInterval.TEN_SECOND,
  descriptiveStatistic: DescriptiveStatistic.AVERAGE
}

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD_SENSORS: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case actions.LOAD_SENSORS_SUCCESS: {
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

    case actions.UPDATE_DATES: {
      const iterations =
        (state.timeFrame.end - state.timeFrame.start) / state.timeInterval

      const dates = []
      for (let i = 0; i < iterations; i++) {
        dates[i] = new Date(state.timeFrame.start + state.timeInterval * i)
      }

      return {
        ...state,
        dates
      }
    }

    case actions.LOAD_SENSORS_DATA: {
      return {
        ...state,
        dataLoaded: {}
      }
    }

    case actions.LOAD_SENSORS_DATA_SUCCESS: {
      const data = action.payload.data
      const id = action.payload.sensor.id

      return {
        ...state,
        data: {
          ...state.data,
          [id]: data
        },
        dataLoaded: {
          ...state.dataLoaded,
          [id]: true
        }
      }
    }

    case actions.SET_TOOLTIP_DATE: {
      // round to interval
      const date = roundToNearest(action.payload.getTime(), state.timeInterval)
      return {
        ...state,
        tooltipDate: new Date(date)
      }
    }

    case actions.SET_TIME_FRAME: {
      return {
        ...state,
        timeFrame: action.payload
      }
    }

    case actions.SET_TIME_INTERVAL: {
      return {
        ...state,
        timeInterval: action.payload
      }
    }

    case actions.SET_DESCRIPTIVE_STATISTIC: {
      return {
        ...state,
        descriptiveStatistic: action.payload
      }
    }

    case actions.DESTROY: {
      return {
        ...initialState
      }
    }

    case actions.TOGGLE_VISIBILITY: {
      return state
      // const id = action.payload
      // const entity = {
      //   ...state.entities[id],
      //   visible: !state.entities[id].visible
      // }
      // const entities = { ...state.entities, [id]: entity }

      // return {
      //   ...state,
      //   entities: entities
      // }
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
export const getDates = (state: State) => state.dates
export const getTimeFrame = (state: State) => state.timeFrame
export const getTimeInterval = (state: State) => state.timeInterval
export const getTooltipDate = (state: State) => state.tooltipDate
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic

export const getSensors = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map(id => entities[id])
  }
)

export const getTooltipValues = createSelector(
  getIds,
  getEntities,
  getData,
  getTooltipDate,
  (ids, sensors, data, date) => {
    if (!date) return []

    return ids.reduce((acc, id) => {
      const index =
        data[id] && data[id].findIndex(d => d.date.getTime() === date.getTime())

      return [
        ...acc,
        {
          id: id,
          label: sensors[id].label,
          dataType: sensors[id].dataType,
          keys: sensors[id].keys || null,
          value: data[id] && index > -1 ? data[id][index].value : null
        }
      ]
    }, [])
  }
)
