import {
  MockAPISampleDataset,
  MockChartDataExpected,
  MockChartDataWithStartEndHolesExpected,
  MockTimeFrame,
  MockTimeFrameWithStartEndHoles,
  MockTimeInterval
} from '../testing/mocks/mock-chart-data'
import { ParseTimeHoles } from './ParseTimeHoles'

describe('ParseTimeHoles', () => {
  it('should add "timeholes" where the timeFrame is the same as the data', () => {
    const actual = ParseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrame,
      MockTimeInterval
    )
    expect(actual).toEqual(MockChartDataExpected)
  })

  it('should add "timeholes" where the timeFrame is different from the data', () => {
    const actual = ParseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameWithStartEndHoles,
      MockTimeInterval
    )
    expect(actual).toEqual(MockChartDataWithStartEndHolesExpected)
  })
})
