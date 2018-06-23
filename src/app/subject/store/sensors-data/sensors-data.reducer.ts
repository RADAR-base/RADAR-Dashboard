import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { DescriptiveStatistic } from '../../../shared/enums/descriptive-statistic.enum'
import { TimeWindow } from '../../../shared/enums/time-window.enum'
import { SensorsData } from '../../../shared/models/sensors-data.model'
import { TimeFrame } from '../../../shared/models/time.model'
import { roundToNearest } from '../../../shared/utils/round-to-nearest'
import * as actions from './sensors-data.actions'

export interface State extends EntityState<SensorsData> {
  areLoaded: { [id: number]: boolean }
  dates: Date[]
  tooltipDate: Date
  timeFrame: TimeFrame
  timeWindow: TimeWindow
  descriptiveStatistic: DescriptiveStatistic
}

export const adapter: EntityAdapter<SensorsData> = createEntityAdapter<
  SensorsData
>({ selectId: state => state.uid })

export const initialState: State = adapter.getInitialState({
  areLoaded: {},
  dates: [],
  tooltipDate: null,
  timeFrame: { start: null, end: null },
  timeWindow: TimeWindow.TEN_SECOND,
  descriptiveStatistic: DescriptiveStatistic.MEDIAN
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.UPDATE_DATES: {
      const iterations =
        (state.timeFrame.end - state.timeFrame.start) / state.timeWindow

      const dates = []
      for (let i = 0; i < iterations; i++) {
        dates[i] = new Date(state.timeFrame.start + state.timeWindow * i)
      }

      return {
        ...state,
        dates
      }
    }

    case actions.LOAD: {
      return {
        ...state,
        areLoaded: {}
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
        ...adapter.addOne({ ...sensor, data }, state),
        areLoaded: { ...state.areLoaded, [id]: true }
      }
    }

    case actions.SET_TOOLTIP_DATE: {
      // round to interval
      const date = roundToNearest(action.payload.getTime(), state.timeWindow)
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
        timeWindow: action.payload
      }
    }

    case actions.SET_DESCRIPTIVE_STATISTIC: {
      return {
        ...state,
        descriptiveStatistic: action.payload
      }
    }

    case actions.DESTROY: {
      return { ...initialState }
    }

    default:
      return state
  }
}

export const getIsDataLoaded = (state: State) => state.areLoaded
export const getDates = (state: State) => state.dates
export const getTimeFrame = (state: State) => state.timeFrame
export const getTimeInterval = (state: State) => state.timeWindow
export const getTooltipDate = (state: State) => state.tooltipDate
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic
