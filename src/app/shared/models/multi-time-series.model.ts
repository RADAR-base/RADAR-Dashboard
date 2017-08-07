import { Key } from '../store/config/config.model'

export interface MultiTimeSeries {
  keys: Key[]
  values: { [key: string]: number[] }
  dates: Date[]
}
