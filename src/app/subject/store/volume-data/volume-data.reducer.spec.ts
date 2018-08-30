import * as volumeDataActions from './volume-data.actions'
import * as fromVolumeData from './volume-data.reducer'

describe('VolumeDataReducer', () => {
  describe('Destroy action', () => {
    it('should return the default state', () => {
      const { initialState } = fromVolumeData
      const action = new volumeDataActions.Destroy()
      const state = fromVolumeData.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load Fail action', () => {
    it('should set loadFail to true', () => {
      const { initialState } = fromVolumeData
      const action = new volumeDataActions.LoadFail()
      const state = fromVolumeData.reducer(initialState, action)

      expect(state.loadFail).toEqual(true)
    })
  })

  describe('Load Success action', () => {
    it('should populate volume data', () => {
      const volume = {
        header: {
          projectName: 'test',
          sources: [],
          subjectId: 'ifodj',
          timeWindow: 'ONE_DAY'
        },
        dataset: [
          {
            startDateTime: '2017-08-28T23:00:00Z',
            value: 0
          }
        ]
      }

      const { initialState } = fromVolumeData
      const action = new volumeDataActions.LoadSuccess(volume)
      const state = fromVolumeData.reducer(initialState, action)

      expect(state.isLoaded).toEqual(true)
      expect(state.loadFail).toEqual(false)
      expect(state.timeWindowChanged).toEqual(false)
      expect(state.timeFrameChanged).toEqual(false)
      expect(state.entities[0]).toEqual({ id: '0', data: volume.dataset[0] })
    })
  })

  describe('Set Time Frame action', () => {
    it('should set timeframe', () => {
      const { initialState } = fromVolumeData
      const timeFrame = { startDateTime: new Date(), endDateTime: new Date() }
      const action = new volumeDataActions.SetTimeFrame(timeFrame)
      const state = fromVolumeData.reducer(initialState, action)

      expect(state.timeFrame).toEqual(timeFrame)
    })
  })

  describe('Set Time Frame action', () => {
    it('should set timeframe when no timeframe is specified', () => {
      const { initialState } = fromVolumeData
      const timeFrame = { startDateTime: null, endDateTime: null }
      const action = new volumeDataActions.SetTimeFrame(timeFrame)
      const state = fromVolumeData.reducer(initialState, action)

      expect(state.timeFrame.startDateTime).toBeTruthy()
    })
  })

  describe('Set Time Interval action', () => {
    it('should set time interval', () => {
      const { initialState } = fromVolumeData
      const timeInterval = 'ONE_HOUR'
      const action = new volumeDataActions.SetTimeInterval(timeInterval)
      const state = fromVolumeData.reducer(initialState, action)

      expect(state.timeWindow).toEqual(timeInterval)
    })
  })
})
