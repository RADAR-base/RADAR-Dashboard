import { ChartData } from '../../models/chart-data.model'
import { EffectiveTimeFrame } from '../../models/sample-data.model'

export const MockComplianceKeys = [
  { key: 'a', doc: 'A', label: { EN: 'A' } },
  { key: 'b', doc: 'B', label: { EN: 'B' } }
]

export const MockAPIComplianceDataset = [
  { startDateTime: '2017-02-27T11:46:00Z', value: { a: 0.2348, b: 0 } },
  { startDateTime: '2017-03-01T11:46:00Z', value: { a: 0.7348, b: 0.823 } },
  { startDateTime: '2017-03-02T11:46:00Z', value: { a: 0.3348, b: 0.323 } },
  { startDateTime: '2017-03-03T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-05T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-08T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-09T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-10T11:46:00Z', value: { a: 0.2348, b: 1 } },
  { startDateTime: '2017-03-19T11:46:00Z', value: { a: 0.2348, b: 0 } },
  { startDateTime: '2017-03-20T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-22T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-23T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-25T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-26T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-03-29T11:46:00Z', value: { a: 0.2348, b: 0.123 } },
  { startDateTime: '2017-04-01T11:46:00Z', value: { a: 0.2348, b: 0.123 } }
]
export const MockTimeIntervalCompliance = 'ONE_DAY'
export const MockTimeFrameCompliance: EffectiveTimeFrame = {
  startDateTime: new Date('2017-02-27T11:46:00Z'),
  endDateTime: new Date('2017-04-01T11:46:00Z')
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

export const MockTimeFrameComplianceWithStartEndHoles: EffectiveTimeFrame = {
  startDateTime: new Date('2017-02-26T11:46:00Z'),
  endDateTime: new Date('2017-04-02T11:46:00Z')
}

export const MockComplianceDataWithStartEndHolesExpected: ChartData[] = [
  {
    date: new Date('2017-02-26T11:46:00Z'),
    value: null
  },
  ...MockComplianceDataExpected,
  { date: new Date('2017-04-02T11:46:00Z'), value: null }
]
