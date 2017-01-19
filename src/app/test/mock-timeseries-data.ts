import { TimeSeries } from '../models/time-series.model';

export const MockTimeSeriesData = [
  { value: 120, date: '2016-10-27T20:02:20Z' },
  { value: 122, date: '2016-10-28T20:02:20Z' },
  { value: 120, date: '2016-10-29T20:02:20Z' },
  { value: 122, date: '2016-10-30T20:02:20Z' }
];

export function parseMockTimeSeriesData(data): TimeSeries[] {
  return data.map(d => ({
    value: d.value,
    date: new Date(d.date)
  }));
}
