import * as sensorsDataActions from './sensors-data.actions'
import * as fromSensorsData from './sensors-data.reducer'

describe('SensorsDataReducer', () => {
  describe('Destroy action', () => {
    it('should return the default state', () => {
      const { initialState } = fromSensorsData
      const action = new sensorsDataActions.Destroy()
      const state = fromSensorsData.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load Success action', () => {
    it('should populate sensors data', () => {
      const payload = {
        data: [],
        sensor: {
          id: 0,
          sourceDataType: '',
          sourceDataName: '',
          uid: 'ifodj'
        }
      }

      const { initialState } = fromSensorsData
      const action = new sensorsDataActions.LoadSuccess(payload)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.areLoaded[payload.sensor.uid]).toBeTruthy()
      expect(state.ids.length).toBe(1)
    })
  })

  describe('Load Success action', () => {
    it('should return same state when sensor is null', () => {
      const payload = {
        data: [],
        sensor: null
      }

      const { initialState } = fromSensorsData
      const action = new sensorsDataActions.LoadSuccess(payload)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Set Time Frame action', () => {
    it('should set timeframe', () => {
      const { initialState } = fromSensorsData
      const timeFrame = { startDateTime: new Date(), endDateTime: new Date() }
      const action = new sensorsDataActions.SetTimeFrame(timeFrame)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.timeFrame).toEqual(timeFrame)
    })
  })

  describe('Set Time Interval action', () => {
    it('should set time interval', () => {
      const { initialState } = fromSensorsData
      const timeInterval = 'ONE_MIN'
      const action = new sensorsDataActions.SetTimeInterval(timeInterval)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.timeWindow).toEqual(timeInterval)
    })
  })
})
