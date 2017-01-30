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

    var lines = {};
    for (var entry in dataset) { 
      var date = dataset[entry].date;
      for (var j in dataset[entry]) {
          if (j!="date") {
            if (!(j in lines)) {
              lines[j] = [];
            }
            lines[j].push({date: new Date(date), 
              val: +dataset[entry][j],
              id: j})
          }
      }
    }

    var data = [];
    for (var ax in lines) {
      data.push({vals: lines[ax]});
    }

    return data;
}
