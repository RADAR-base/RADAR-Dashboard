import * as sensorsDataActions from './sensors-data.actions'
import * as fromSensorsData from './sensors-data.reducer'

describe('SensorsDataReducer', () => {
  const sensorsDataPayload = {
    data: [],
    sensor: {
      id: 0,
      sourceDataType: '',
      sourceDataName: '',
      uid: 'de3ede32-ac72-11e8-98d0-529269fb1459'
    }
  }
  const sensorsDataPayloadUpdated = {
    data: [{ date: new Date(), value: 1 }],
    sensor: {
      id: 0,
      sourceDataType: '',
      sourceDataName: '',
      uid: 'de3ede32-ac72-11e8-98d0-529269fb1459'
    }
  }
  const emptySensorsData = {
    data: [],
    sensor: null
  }

  const { initialState } = fromSensorsData

  describe('Destroy action', () => {
    it('should return the default state', () => {
      const action = new sensorsDataActions.Destroy()
      const state = fromSensorsData.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load action', () => {
    it('should return same state', () => {
      const action = new sensorsDataActions.Load()
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.entities).toBe(initialState.entities)
    })
  })

  describe('Load Success action', () => {
    it('should populate sensors data', () => {
      const action = new sensorsDataActions.LoadSuccess(sensorsDataPayload)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.areLoaded[sensorsDataPayload.sensor.uid]).toBeTruthy()
      expect(state.ids.length).toBe(1)
    })
  })

  describe('Load Success action', () => {
    it('should return same state when sensor is null', () => {
      const action = new sensorsDataActions.LoadSuccess(emptySensorsData)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load Success action', () => {
    it('should return updated state when sensor exists', () => {
      // NOTE: Initialise state
      const action = new sensorsDataActions.LoadSuccess(sensorsDataPayload)
      const state = fromSensorsData.reducer(initialState, action)

      // NOTE: Update state
      const actionUpdate = new sensorsDataActions.LoadSuccess(
        sensorsDataPayloadUpdated
      )
      const stateUpdated = fromSensorsData.reducer(state, actionUpdate)

      expect(stateUpdated.areLoaded[sensorsDataPayload.sensor.uid]).toBeTruthy()
      expect(
        stateUpdated.entities[sensorsDataPayload.sensor.uid].data.length
      ).toBe(1)
    })
  })

  describe('Set Time Frame action', () => {
    it('should set timeframe', () => {
      const timeFrame = { startDateTime: new Date(), endDateTime: new Date() }
      const action = new sensorsDataActions.SetTimeFrame(timeFrame)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.timeFrame).toEqual(timeFrame)
    })
  })

  describe('Set Time Interval action', () => {
    it('should set time interval', () => {
      const timeInterval = 'ONE_MIN'
      const action = new sensorsDataActions.SetTimeInterval(timeInterval)
      const state = fromSensorsData.reducer(initialState, action)

      expect(state.timeWindow).toEqual(timeInterval)
    })
  })
})
