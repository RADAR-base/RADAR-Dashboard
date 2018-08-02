import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { DescriptiveStatistic } from '../../../shared/enums/descriptive-statistic.enum'
import { TimeFrame } from '../../../shared/models/time.model'
import * as actions from './volume-data.actions'

export interface VolumeData {
  id: any
  data: any
}

export interface State extends EntityState<VolumeData> {
  isLoaded: boolean
  timeFrame: TimeFrame
  prevTimeFrame: TimeFrame
  timeWindow: string
  prevTimeWindow: string
  descriptiveStatistic: DescriptiveStatistic
  loadFail: boolean
  timeFrameChanged: boolean
  timeWindowChanged: boolean
}

export const adapter: EntityAdapter<VolumeData> = createEntityAdapter<
  VolumeData
>({
  selectId: state => state.id
})

export const initialState: State = adapter.getInitialState({
  isLoaded: false,
  timeFrame: null,
  prevTimeFrame: null,
  timeWindow: null,
  prevTimeWindow: null,
  descriptiveStatistic: DescriptiveStatistic.DISTINCT,
  loadFail: false,
  timeFrameChanged: false,
  timeWindowChanged: false
})

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.LOAD: {
      return {
        ...state
      }
    }

    case actions.LOAD_FAIL: {
      return {
        ...state,
        loadFail: true
      }
    }

    case actions.LOAD_FAIL_RESET: {
      return {
        ...state,
        timeWindow: state.prevTimeWindow,
        loadFail: false,
        timeWindowChanged: false
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
        prevTimeFrame: state.timeFrame,
        timeFrame: tempTimeFrame,
        timeFrameChanged: true
      }
    }

    case actions.SET_TIME_INTERVAL: {
      return {
        ...state,
        prevTimeWindow: state.timeWindow,
        timeWindow: action.payload,
        timeWindowChanged: true
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
        loadFail: false,
        timeFrameChanged: false,
        timeWindowChanged: false
      }
    }

    default:
      return state
  }
}

export const getIsDataLoaded = (state: State) => state.isLoaded
export const getTimeFrame = (state: State) => state.timeFrame
export const getPrevTimeFrame = (state: State) => state.prevTimeFrame
export const getTimeInterval = (state: State) => state.timeWindow
export const getPrevTimeInterval = (state: State) => state.prevTimeWindow
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic
export const getHasLoadFailed = (state: State) => state.loadFail
export const getHasTimeFrameChanged = (state: State) => state.timeFrameChanged
export const getHasTimeWindowChanged = (state: State) => state.timeWindowChanged
