import * as complianceDataActions from './compliance-data.actions'
import * as fromComplianceData from './compliance-data.reducer'

describe('ComplianceDataReducer', () => {
  const { initialState } = fromComplianceData
  describe('Destroy action', () => {
    it('should return the default state', () => {
      const action = new complianceDataActions.Destroy()
      const state = fromComplianceData.reducer(undefined, action)

      expect(state).toBe(initialState)
    })
  })

  describe('Load action', () => {
    it('should populate compliance data', () => {
      const action = new complianceDataActions.Load()
      const state = fromComplianceData.reducer(initialState, action)

      expect(state.isLoaded).toEqual(false)
    })
  })

  describe('Load Success action', () => {
    it('should populate compliance data', () => {
      const action = new complianceDataActions.LoadSuccess({})
      const state = fromComplianceData.reducer(initialState, action)

      expect(state.isLoaded).toEqual(true)
    })
  })

  describe('Set Time Frame action', () => {
    it('should set timeframe', () => {
      const timeFrame = '30 days'
      const action = new complianceDataActions.SetTimeFrame(timeFrame)
      const state = fromComplianceData.reducer(initialState, action)

      expect(state.timeFrame).toEqual(timeFrame)
    })
  })
})
