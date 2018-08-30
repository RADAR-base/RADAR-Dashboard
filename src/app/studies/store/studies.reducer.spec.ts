import * as studiesActions from './studies.actions'
import * as fromStudies from './studies.reducer'

describe('StudiesReducer', () => {
  const { initialState } = fromStudies
  describe('Destroy action', () => {
    it('should return the default state', () => {
      const action = new studiesActions.Destroy()
      const state = fromStudies.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load action', () => {
    it('should populate studies', () => {
      const action = new studiesActions.Load()
      const state = fromStudies.reducer(initialState, action)

      expect(state.isLoaded).toEqual(false)
    })
  })

  describe('Load Success action', () => {
    it('should populate studies', () => {
      const action = new studiesActions.LoadSuccess([{ id: 0 }])
      const state = fromStudies.reducer(initialState, action)

      expect(state.isLoaded).toEqual(true)
    })
  })
})
