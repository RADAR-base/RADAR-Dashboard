import { TimeSeries } from '../../models/time-series.model'

export const MockTimeSeriesDataValues = [0, 0, 0]
export const MockTimeSeriesDataDates = [
  new Date('2016-10-27T20:02:20Z'),
  new Date('2016-10-28T20:02:20Z'),
  new Date('2016-10- 29T20: 02: 20Z')
]

export function parseMockTimeSeriesData(data): TimeSeries[] {
  return data.map(d => ({
    value: d.value,
    date: new Date(d.date)
  }))
}
