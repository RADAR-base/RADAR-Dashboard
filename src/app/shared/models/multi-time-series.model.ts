import { Key } from './config.model'

export interface MultiTimeSeries {
  values: { [key: string]: number[] }
  keys: Key[]
  dates?: Date[]
}
