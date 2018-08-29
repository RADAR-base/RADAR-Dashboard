import * as volumeDataActions from './volume-data.actions'
import * as fromVolumeData from './volume-data.reducer'

describe('VolumeDataReducer', () => {
  describe('destroy action', () => {
    it('should return the default state', () => {
      const { initialState } = fromVolumeData
      const action = new volumeDataActions.Destroy()
      const state = fromVolumeData.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })
})
