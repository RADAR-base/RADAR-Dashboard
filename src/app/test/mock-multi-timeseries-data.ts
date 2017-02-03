import { MultiTimeSeries } from '../models/multi-time-series.model';

export const MockMultiTimeSeriesData = [
  { x: 120, y: 120, z: 120, date: '2016-10-27T20:02:20Z' },
  { x: 122, y: 122, z: 122, date: '2016-10-28T20:02:20Z' },
  { x: 120, y: 120, z: 120, date: '2016-10-29T20:02:20Z' },
  { x: 122, y: 122, z: 122, date: '2016-10-30T20:02:20Z' }
];

export function parseMockMultiTimeSeriesData(dataset): MultiTimeSeries[] {

  // Reshaping the data as to have date value info
  // for each of the measurements (e.g. x, y, z)

    const lines = {};
    for (const entry of dataset) {
      const date = entry.date;
      for (const j in entry) {
        if (entry.hasOwnProperty(j)) {
          if (j !== 'date') {
            if (!(j in lines)) {
              lines[j] = [];
            }
            lines[j].push({date: new Date(date),
              val: +entry[j],
              id: j});
          }
        }
      }
    }

    const data = [];
    for (const ax in lines) {
      if (lines.hasOwnProperty(ax)) {
        data.push({vals: lines[ax]});
      }
    }

    return data;
}
