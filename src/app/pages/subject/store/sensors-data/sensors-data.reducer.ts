import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '../../../../../tmp_modules/@ngrx/entity'
import { createSelector } from '@ngrx/store'

import { ChartData } from '../../../../shared/models/chart-data.model'
import { DescriptiveStatistic } from '../../../../shared/models/descriptive-statistic.enum'
import { TimeFrame } from '../../../../shared/models/time-frame.model'
import { TimeInterval } from '../../../../shared/models/time-interval.enum'
import { roundToNearest } from '../../../../shared/utils/round-to-nearest'
import * as sensorsDataActions from './sensors-data.actions'
import { Sensor } from '../../models/subject.model'

export interface State extends EntityState<any> {
  areLoaded: { [id: number]: boolean }
  dates: Date[]
  tooltipDate: Date
  timeFrame: TimeFrame
  timeInterval: TimeInterval
  descriptiveStatistic: DescriptiveStatistic
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>()

export const initialState: State = adapter.getInitialState({
  areLoaded: {},
  dates: [],
  tooltipDate: null,
  timeFrame: { start: null, end: null },
  timeInterval: TimeInterval.TEN_SECOND,
  descriptiveStatistic: DescriptiveStatistic.AVERAGE
})

export function reducer(
  state = initialState,
  action: sensorsDataActions.Actions
): State {
  switch (action.type) {
    case sensorsDataActions.UPDATE_DATES: {
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

    case sensorsDataActions.LOAD: {
      return {
        ...state,
        areLoaded: {}
      }
    }

    case sensorsDataActions.LOAD_SUCCESS: {
      const data = action.payload.data
      const id = action.payload.sensor.id

      return {
        ...adapter.addOne({ id, data }, state),
        areLoaded: { ...state.areLoaded, [id]: true }
      }
    }

    case sensorsDataActions.SET_TOOLTIP_DATE: {
      // round to interval
      const date = roundToNearest(action.payload.getTime(), state.timeInterval)
      return {
        ...state,
        tooltipDate: new Date(date)
      }
    }

    case sensorsDataActions.SET_TIME_FRAME: {
      return {
        ...state,
        timeFrame: action.payload
      }
    }

    case sensorsDataActions.SET_TIME_INTERVAL: {
      return {
        ...state,
        timeInterval: action.payload
      }
    }

    case sensorsDataActions.SET_DESCRIPTIVE_STATISTIC: {
      return {
        ...state,
        descriptiveStatistic: action.payload
      }
    }

    case sensorsDataActions.DESTROY: {
      return {
        ...initialState
      }
    }

    default:
      return state
  }
}

export const getIsDataLoaded = (state: State) => state.areLoaded
export const getDates = (state: State) => state.dates
export const getTimeFrame = (state: State) => state.timeFrame
export const getTimeInterval = (state: State) => state.timeInterval
export const getTooltipDate = (state: State) => state.tooltipDate
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic

// NOTE: Not sure what bottom is for
// export const getSensors = createSelector(
//   getSensorsData,
//   getSensorsIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id])
//   }
// )
