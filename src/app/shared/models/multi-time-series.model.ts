import { ConfigKey } from './config.model'

export interface MultiTimeSeries {
  values: { [key: string]: number[] }
  keys?: ConfigKey[]
  dates?: Date[]
}
