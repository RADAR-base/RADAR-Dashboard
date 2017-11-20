import { TimeInterval } from '../enums/time-interval.enum'
import {
  MockAPISampleDataset,
  MockAPISampleDatasetZeroVals,
  MockChartDataExpected,
  MockChartDataWithStartEndHolesExpected,
  MockChartDataZeroValsExpected,
  MockTimeFrameChartData,
  MockTimeFrameChartDataWithStartEndHoles
} from '../testing/mocks/mock-chart-data'
import {
  MockAPIComplianceDataset,
  MockComplianceDataExpected,
  MockComplianceDataWithStartEndHolesExpected,
  MockTimeFrameCompliance,
  MockTimeFrameComplianceWithStartEndHoles
} from '../testing/mocks/mock-compliance-data'
import { parseTimeHoles } from './parse-time-holes'

describe('parseTimeHoles', () => {
  it('Sensor Data > 10s Interval > Zero Values', () => {
    const actual = parseTimeHoles(
      MockAPISampleDatasetZeroVals,
      MockTimeFrameChartData,
      TimeInterval.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataZeroValsExpected)
  })

  it('Sensor Data > 10s Interval > TimeFrame === Data', () => {
    const actual = parseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartData,
      TimeInterval.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataExpected)
  })

  it('Sensor Data > 10s Interval > TimeFrame !== Data', () => {
    const actual = parseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartDataWithStartEndHoles,
      TimeInterval.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataWithStartEndHolesExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame === Data', () => {
    const actual = parseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameCompliance,
      TimeInterval.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame !== Data', () => {
    const actual = parseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameComplianceWithStartEndHoles,
      TimeInterval.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataWithStartEndHolesExpected)
  })
})
