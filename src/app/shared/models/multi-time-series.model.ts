import { Key } from '../store/sensors/sensors.model'

export interface MultiTimeSeries {
  keys: Key[]
  values: { [key: string]: number[] }
  dates: Date[]
}
