import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { DescriptiveStatistic } from '../../../shared/enums/descriptive-statistic.enum'
import { TimeWindow } from '../../../shared/enums/time-window.enum'
import { SensorsData } from '../../../shared/models/sensors-data.model'
import { TimeFrame } from '../../../shared/models/time.model'
import { roundToNearest } from '../../../shared/utils/round-to-nearest'
import * as actions from './volume-data.actions'

export interface VolumeData {
  id: any
  data: any
}

export interface State extends EntityState<VolumeData> {
  isLoaded: boolean
  timeFrame: TimeFrame
  timeWindow: string
  descriptiveStatistic: DescriptiveStatistic
}

export const adapter: EntityAdapter<VolumeData> = createEntityAdapter<
  VolumeData
>({
  selectId: state => state.id
})

export const initialState: State = adapter.getInitialState({
  isLoaded: false,
  timeFrame: null,
  timeWindow: null,
  descriptiveStatistic: DescriptiveStatistic.DISTINCT
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return {
        ...state
      }
    }

    case actions.DESTROY: {
      return initialState
    }

    case actions.SET_TIME_FRAME: {
      let tempTimeFrame
      if (!action.payload.startDateTime) {
        const endTime = new Date()
        const startTime = new Date(
          endTime.getFullYear() - 1,
          endTime.getMonth(),
          endTime.getDate()
        )
        tempTimeFrame = {
          startDateTime: startTime,
          endDateTime: endTime
        }
      } else {
        tempTimeFrame = action.payload
      }
      return {
        ...state,
        timeFrame: tempTimeFrame
      }
    }

    case actions.SET_TIME_INTERVAL: {
      return {
        ...state,
        timeWindow: action.payload
      }
    }

    case actions.LOAD_SUCCESS: {
      const data = action.payload.dataset
      const header = action.payload.header

      if (!data) {
        return state
      }

      const new_data = new Array()
      for (const key of Object.keys(data)) {
        new_data.push({ id: key, data: data[key] })
      }

      return {
        ...adapter.addAll(new_data, state),
        isLoaded: true,
        timeFrame: header.timeFrame,
        timeWindow: header.timeWindow,
        descriptiveStatistic: header.statistic
      }
    }

    default:
      return state
  }
}

export const getIsDataLoaded = (state: State) => state.isLoaded
export const getTimeFrame = (state: State) => state.timeFrame
export const getTimeInterval = (state: State) => state.timeWindow
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic
