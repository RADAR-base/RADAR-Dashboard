import { ChartOptions } from './chart-options.model'
import { ConfigKey, ConfigLabel } from './config.model'
import { SourceData } from './source-data.model'

export interface Sensor extends SourceData {
  source?: string
  type?: string
  unit?: string
  label?: ConfigLabel
  chart?: ChartOptions
  keys?: ConfigKey[]
  visible?: boolean
}
