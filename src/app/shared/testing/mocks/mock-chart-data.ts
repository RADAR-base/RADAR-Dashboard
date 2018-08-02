import { TimeWindow } from '../../enums/time-window.enum'
import { ChartData } from '../../models/chart-data.model'
import { EffectiveTimeFrame } from '../../models/sample-data.model'

export const MockAPISampleDataset = [
  { startDateTime: '2017-06-16T10:09:10.000Z', value: 153 },
  { startDateTime: '2017-06-16T10:09:50.000Z', value: 87 },
  { startDateTime: '2017-06-16T10:14:10.000Z', value: 0 },
  { startDateTime: '2017-06-16T10:14:20.000Z', value: 143 },
  { startDateTime: '2017-06-16T10:14:30.000Z', value: 0 },
  { startDateTime: '2017-06-16T10:46:40.000Z', value: 98 },
  { startDateTime: '2017-06-16T10:46:50.000Z', value: 101 },
  { startDateTime: '2017-06-16T10:49:00.000Z', value: 159 }
]

export const MockTimeIntervalChartData = 'TEN_SECOND'
export const MockTimeFrameChartData: EffectiveTimeFrame = {
  startDateTime: new Date('2017-06-16T10:09:10.000Z'),
  endDateTime: new Date('2017-06-16T10:49:00.000Z')
}

export const MockChartDataExpected: ChartData[] = [
  { date: new Date('2017-06-16T10:09:10.000Z'), value: 153 },
  { date: new Date('2017-06-16T10:09:40.000Z'), value: null },
  { date: new Date('2017-06-16T10:09:50.000Z'), value: 87 },
  { date: new Date('2017-06-16T10:14:00.000Z'), value: null },
  { date: new Date('2017-06-16T10:14:10.000Z'), value: 0 },
  { date: new Date('2017-06-16T10:14:20.000Z'), value: 143 },
  { date: new Date('2017-06-16T10:14:30.000Z'), value: 0 },
  { date: new Date('2017-06-16T10:46:30.000Z'), value: null },
  { date: new Date('2017-06-16T10:46:40.000Z'), value: 98 },
  { date: new Date('2017-06-16T10:46:50.000Z'), value: 101 },
  { date: new Date('2017-06-16T10:48:50.000Z'), value: null },
  { date: new Date('2017-06-16T10:49:00.000Z'), value: 159 }
]

export const MockTimeFrameChartDataWithStartEndHoles: EffectiveTimeFrame = {
  startDateTime: new Date('2017-06-16T10:09:00.000Z'),
  endDateTime: new Date('2017-06-16T10:49:10.000Z')
}

export const MockChartDataWithStartEndHolesExpected: ChartData[] = [
  {
    date: new Date('2017-06-16T10:09:00.000Z'),
    value: null
  },
  ...MockChartDataExpected,
  { date: new Date('2017-06-16T10:49:10.000Z'), value: null }
]
