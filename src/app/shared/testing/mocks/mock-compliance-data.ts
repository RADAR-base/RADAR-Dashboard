import { ChartData } from '../../models/chart-data.model'
import { TimeInterval } from '../../store/sensors/sensors.model'

export const MockComplianceData = {
  keys: [
    { key: 'simple', label: { EN: '' } },
    { key: 'special', label: { EN: '' } }
  ],
  dates: [
    new Date('2016-10-27T20:02:20.000Z'),
    new Date('2016-10-27T20:03:00.000Z')
  ],
  values: {
    simple: [0.5, 0.1],
    special: [0.23, 0.123]
  }
}

export const MockAPIComplianceDataset = [
  { startDateTime: '2017-02-27T11:46:00Z', sample: { a: 0.2348, b: 0 } },
  { startDateTime: '2017-03-01T11:46:00Z', sample: { a: 0.7348, b: 0.823 } },
  { startDateTime: '2017-03-02T11:46:00Z', sample: { a: 0.3348, b: 0.323 } },
  { startDateTime: '2017-03-03T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-05T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-08T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-09T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-10T11:46:00Z', sample: { a: 0.2348, b: 1 } },
  { startDateTime: '2017-03-19T11:46:00Z', sample: { a: 0.2348, b: 0 } },
  { startDateTime: '2017-03-20T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-22T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-23T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-25T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-26T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-29T11:46:00Z', sample: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-04-01T11:46:00Z', sample: { a: 0.2348, b: 0.123 } }
]

export const MockTimeFrameCompliance = {
  start: new Date(MockAPIComplianceDataset[0].startDateTime).getTime(),
  end: new Date(
    MockAPIComplianceDataset[MockAPIComplianceDataset.length - 1].startDateTime
  ).getTime()
}

export const MockComplianceDataExpected = [
  { date: new Date('2017-02-27T11:46:00Z'), value: { a: 0.2348, b: 0 } },
  { date: new Date('2017-02-28T11:46:00Z'), value: null },
  { date: new Date('2017-03-01T11:46:00Z'), value: { a: 0.7348, b: 0.823 } },
  { date: new Date('2017-03-02T11:46:00Z'), value: { a: 0.3348, b: 0.323 } },
  { date: new Date('2017-03-03T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-04T11:46:00Z'), value: null },
  { date: new Date('2017-03-05T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-07T11:46:00Z'), value: null },
  { date: new Date('2017-03-08T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-09T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-10T11:46:00Z'), value: { a: 0.2348, b: 1 } },
  { date: new Date('2017-03-18T11:46:00Z'), value: null },
  { date: new Date('2017-03-19T11:46:00Z'), value: { a: 0.2348, b: 0 } },
  { date: new Date('2017-03-20T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-21T11:46:00Z'), value: null },
  { date: new Date('2017-03-22T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-23T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-24T11:46:00Z'), value: null },
  { date: new Date('2017-03-25T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-26T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-28T11:46:00Z'), value: null },
  { date: new Date('2017-03-29T11:46:00Z'), value: { a: 0.2348, b: 0.123 } },
  { date: new Date('2017-03-31T11:46:00Z'), value: null },
  { date: new Date('2017-04-01T11:46:00Z'), value: { a: 0.2348, b: 0.123 } }
]

export const MockTimeFrameComplianceWithStartEndHoles = {
  start: MockTimeFrameCompliance.start - TimeInterval.ONE_DAY * 4,
  end: MockTimeFrameCompliance.end + TimeInterval.ONE_DAY * 4
}

export const MockComplianceDataWithStartEndHolesExpected: ChartData[] = [
  {
    date: new Date(MockTimeFrameComplianceWithStartEndHoles.start),
    value: null
  },
  ...MockComplianceDataExpected,
  { date: new Date(MockTimeFrameComplianceWithStartEndHoles.end), value: null }
]
