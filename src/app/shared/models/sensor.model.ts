import { DataType } from '../enums/data-type.enum'
import { ChartOptions } from './chart-options.model'
import { ConfigKey, ConfigLabel } from './config.model'

export interface Sensor {
  id?: number
  source?: string
  keys?: ConfigKey[]
  type?: string
  visible?: boolean
  unit: string
  label: ConfigLabel
  dataType: DataType
  chart: ChartOptions
}
