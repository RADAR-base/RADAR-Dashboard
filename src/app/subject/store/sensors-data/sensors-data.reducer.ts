import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { DescriptiveStatistic } from '../../../shared/enums/descriptive-statistic.enum'
import { TimeWindow } from '../../../shared/enums/time-window.enum'
import { SensorsData } from '../../../shared/models/sensors-data.model'
import { TimeFrame } from '../../../shared/models/time.model'
import { roundToNearest } from '../../../shared/utils/round-to-nearest'
import * as actions from './sensors-data.actions'

export interface State extends EntityState<SensorsData> {
  areLoaded: { [id: number]: boolean }
  tooltipDate: Date
  timeFrame: TimeFrame
  prevTimeFrame: TimeFrame
  timeWindow: string
  prevTimeWindow: string
  descriptiveStatistic: Number
}

export const adapter: EntityAdapter<SensorsData> = createEntityAdapter<
  SensorsData
>({ selectId: state => state.uid })

export const initialState: State = adapter.getInitialState({
  areLoaded: {},
  tooltipDate: null,
  timeFrame: { startDateTime: null, endDateTime: null },
  prevTimeFrame: { startDateTime: null, endDateTime: null },
  timeWindow: null,
  prevTimeWindow: null,
  descriptiveStatistic: DescriptiveStatistic.MEDIAN
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return {
        ...state
      }
    }

    case actions.LOAD_SUCCESS: {
      const sensor = action.payload.sensor

      if (!sensor) {
        return state
      }

      const data = action.payload.data
      const id = sensor.uid

      return {
        ...(state.areLoaded[id] == null
          ? adapter.addOne({ ...sensor, data }, state)
          : adapter.updateOne({ id: id, changes: { data: data } }, state)),
        areLoaded: { ...state.areLoaded, [id]: true }
      }
    }

    case actions.SET_TOOLTIP_DATE: {
      // round to interval
      const date = roundToNearest(
        action.payload.getTime(),
        TimeWindow[state.timeWindow]
      )
      return {
        ...state,
        tooltipDate: new Date(date)
      }
    }

    case actions.SET_TIME_FRAME: {
      return {
        ...state,
        prevTimeFrame: state.timeFrame,
        timeFrame: action.payload
      }
    }

    case actions.SET_TIME_INTERVAL: {
      return {
        ...state,
        prevTimeWindow: state.timeWindow,
        timeWindow: action.payload
      }
    }

    case actions.SET_DESCRIPTIVE_STATISTIC: {
      return {
        ...state,
        descriptiveStatistic: action.payload
      }
    }

    case actions.SET_TO_LOADING: {
      return {
        ...state,
        areLoaded: Object.keys(state.areLoaded).reduce((acc, id) => {
          acc[id] = false
          return acc
        }, {})
      }
    }

    case actions.DESTROY: {
      return initialState
    }

    default:
      return state
  }
}

export const getIsDataLoaded = (state: State) => state.areLoaded
export const getTimeFrame = (state: State) => state.timeFrame
export const getPrevTimeFrame = (state: State) => state.prevTimeFrame
export const getTimeInterval = (state: State) => state.timeWindow
export const getPrevTimeInterval = (state: State) => state.prevTimeWindow
export const getTooltipDate = (state: State) => state.tooltipDate
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic
