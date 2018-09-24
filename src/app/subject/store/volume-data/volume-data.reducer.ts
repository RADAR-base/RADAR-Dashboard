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
  isPrevLoaded: boolean
  timeFrame: TimeFrame
  prevTimeFrame: TimeFrame
  timeWindow: string
  prevTimeWindow: string
  descriptiveStatistic: DescriptiveStatistic
  loadFail: boolean
  loadFailReset: boolean
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
  isPrevLoaded: false,
  timeFrame: null,
  prevTimeFrame: null,
  timeWindow: null,
  prevTimeWindow: null,
  descriptiveStatistic: DescriptiveStatistic.DISTINCT,
  loadFail: false,
  loadFailReset: false,
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
        loadFailReset: true,
        timeWindowChanged: false
      }
    }

    case actions.LOAD_FAIL_RESET_SUCCESS: {
      return {
        ...state,
        isLoaded: true,
        loadFailReset: false
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
        timeWindowChanged: true,
        isLoaded: false
      }
    }

    case actions.SET_TO_LOADING: {
      return {
        ...state,
        isLoaded: false
      }
    }

    case actions.LOAD_SUCCESS: {
      const data = action.payload.dataset

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
        isPrevLoaded: true,
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
export const getIsDataPrevLoaded = (state: State) => state.isPrevLoaded
export const getTimeFrame = (state: State) => state.timeFrame
export const getPrevTimeFrame = (state: State) => state.prevTimeFrame
export const getTimeInterval = (state: State) => state.timeWindow
export const getPrevTimeInterval = (state: State) => state.prevTimeWindow
export const getDescriptiveStatistic = (state: State) =>
  state.descriptiveStatistic
export const getHasLoadFailed = (state: State) => state.loadFail
export const getHasResetLoadFailed = (state: State) => state.loadFailReset
export const getHasTimeFrameChanged = (state: State) => state.timeFrameChanged
export const getHasTimeWindowChanged = (state: State) => state.timeWindowChanged
