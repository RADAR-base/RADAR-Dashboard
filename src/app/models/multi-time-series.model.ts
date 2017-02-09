import { TimeSeries } from './time-series.model';

export interface MultiTimeSeries {
  id: string;
  values: TimeSeries[];
}
