import { ChartData } from '../../models/chart-data.model'
import { TimeInterval } from '../../store/sensors/sensors.model'

export const MockAPISampleDataset = [
  { startDateTime: '2017-06-16T10:09:10.000Z', sample: { value: 153 } },
  { startDateTime: '2017-06-16T10:09:50.000Z', sample: { value: 87 } },
  { startDateTime: '2017-06-16T10:14:10.000Z', sample: { value: 150 } },
  { startDateTime: '2017-06-16T10:14:20.000Z', sample: { value: 143 } },
  { startDateTime: '2017-06-16T10:14:30.000Z', sample: { value: 129 } },
  { startDateTime: '2017-06-16T10:46:40.000Z', sample: { value: 98 } },
  { startDateTime: '2017-06-16T10:46:50.000Z', sample: { value: 101 } },
  { startDateTime: '2017-06-16T10:49:00.000Z', sample: { value: 159 } }
]

const startDate = new Date(MockAPISampleDataset[0].startDateTime).getTime()
const endDate = new Date(
  MockAPISampleDataset[MockAPISampleDataset.length - 1].startDateTime
).getTime()

export const MockTimeInterval = TimeInterval.TEN_SECOND
export const MockTimeFrame = {
  start: startDate,
  end: endDate
}

export const MockChartDataExpected: ChartData[] = [
  { date: new Date('2017-06-16T10:09:10.000Z'), value: 153 },
  { date: new Date('2017-06-16T10:09:40.000Z'), value: null },
  { date: new Date('2017-06-16T10:09:50.000Z'), value: 87 },
  { date: new Date('2017-06-16T10:14:00.000Z'), value: null },
  { date: new Date('2017-06-16T10:14:10.000Z'), value: 150 },
  { date: new Date('2017-06-16T10:14:20.000Z'), value: 143 },
  { date: new Date('2017-06-16T10:14:30.000Z'), value: 129 },
  { date: new Date('2017-06-16T10:46:30.000Z'), value: null },
  { date: new Date('2017-06-16T10:46:40.000Z'), value: 98 },
  { date: new Date('2017-06-16T10:46:50.000Z'), value: 101 },
  { date: new Date('2017-06-16T10:48:50.000Z'), value: null },
  { date: new Date('2017-06-16T10:49:00.000Z'), value: 159 }
]

export const MockTimeFrameWithStartEndHoles = {
  start: startDate - MockTimeInterval * 2,
  end: endDate + MockTimeInterval * 4
}

export const MockChartDataWithStartEndHolesExpected: ChartData[] = [
  { date: new Date(MockTimeFrameWithStartEndHoles.start), value: null },
  ...MockChartDataExpected,
  { date: new Date(MockTimeFrameWithStartEndHoles.end), value: null }
]
