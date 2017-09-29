import { DataType } from '../enums/data-type.enum'
import { ChartOptions } from './chart-options.model'
import { ConfigKey, ConfigLabel } from './config.model'

export interface Sensor {
  id: string
  source: string
  type: string
  unit: string
  label: ConfigLabel
  dataType: DataType
  chart: ChartOptions
  keys?: ConfigKey[]
  visible?: boolean
}
