import { MultiTimeSeries } from '../models/multi-time-series.model'
import { parseMockTimeSeriesData } from './mock-timeseries-data'

export const MockMultiTimeSeriesData = [
  {
    'id': 'x',
    'values': [
      { 'value': 50.17274154968215, 'date': '2016-10-27T20:02:20.000Z' },
      { 'value': 108.39180563508566, 'date': '2016-10-27T20:03:00.000Z' },
      { 'value': 100.30344544328108, 'date': '2016-10-27T20:03:10.000Z' },
      { 'value': 83.8401962366746, 'date': '2016-10-27T20:03:20.000Z' }
    ]
  },
  {
    'id': 'y',
    'values': [
      { 'value': 89.17274154968214, 'date': '2016-10-27T20:02:20.000Z' },
      { 'value': 99.39180563508566, 'date': '2016-10-27T20:03:00.000Z' },
      { 'value': 98.39180563508566, 'date': '2016-10-27T20:03:10.000Z' },
      { 'value': 99.39180563508566, 'date': '2016-10-27T20:03:20.000Z' }
    ]
  },
  {
    'id': 'z',
    'values': [
      { 'value': 43.17274154968215, 'date': '2016-10-27T20:02:20.000Z' },
      { 'value': 47.39180563508566, 'date': '2016-10-27T20:03:00.000Z' },
      { 'value': 55.39180563508566, 'date': '2016-10-27T20:03:10.000Z' },
      { 'value': 47.39180563508566, 'date': '2016-10-27T20:03:20.000Z' }
    ]
  }
]

export function parseMockMultiTimeSeriesData (dataset): MultiTimeSeries[] {
  return dataset.map(data => ({
    id: data.id,
    values: parseMockTimeSeriesData(data.values)
  }))
}
