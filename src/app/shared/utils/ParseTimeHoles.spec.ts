import { TimeInterval } from '../store/sensors/sensors.model'
import {
  MockAPISampleDataset,
  MockChartDataExpected,
  MockChartDataWithStartEndHolesExpected,
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
import { ParseTimeHoles } from './ParseTimeHoles'

describe('ParseTimeHoles', () => {
  it('Sensor Data > 10s Interval > TimeFrame === Data', () => {
    const actual = ParseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartData,
      TimeInterval.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataExpected)
  })

  it('Sensor Data > 10s Interval > TimeFrame !== Data', () => {
    const actual = ParseTimeHoles(
      MockAPISampleDataset,
      MockTimeFrameChartDataWithStartEndHoles,
      TimeInterval.TEN_SECOND
    )
    expect(actual).toEqual(MockChartDataWithStartEndHolesExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame === Data', () => {
    const actual = ParseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameCompliance,
      TimeInterval.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataExpected)
  })

  it('Compliance Data > 1d Interval > TimeFrame !== Data', () => {
    const actual = ParseTimeHoles(
      MockAPIComplianceDataset,
      MockTimeFrameComplianceWithStartEndHoles,
      TimeInterval.ONE_DAY
    )
    expect(actual).toEqual(MockComplianceDataWithStartEndHolesExpected)
  })
})
