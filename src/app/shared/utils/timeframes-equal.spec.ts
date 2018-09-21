import { MockTimeFrameChartData } from '../testing/mocks/mock-chart-data'
import { timeFramesEqual } from './timeframes-equal'

describe('timeFramesEqual', () => {
  const timeFrameA = MockTimeFrameChartData
  const timeFrameB = MockTimeFrameChartData
  const timeFrameC = {
    startDateTime: MockTimeFrameChartData.startDateTime,
    endDateTime: new Date()
  }
  const timeFrameD = { startDateTime: null, endDateTime: null }

  it('The same time frames should be equal', () => {
    const result = timeFramesEqual(timeFrameA, timeFrameB)
    expect(result).toBeTruthy()
  })

  it('Different time frames should not be equal', () => {
    const result = timeFramesEqual(timeFrameA, timeFrameC)
    expect(result).toBeFalsy()
  })

  it('Null should not be equal', () => {
    const result = timeFramesEqual(timeFrameB, timeFrameD)
    expect(result).toBeFalsy()
  })
})
