import { DataType } from '../enums/data-type.enum'
import { ChartOptions } from './chart-options.model'
import { ConfigKey, ConfigLabel } from './config.model'

export interface SourceData {
  id: number
  sourceDataType: string
  sourceDataName: string
  keySchema?: string
  valueSchema?: string
  topic?: string
  enabled?: boolean
  unit?: string
  frequency?: string
  provider?: string
  processingState?: string

  // Added values
  uid?: string
  sourceId?: string
  label?: ConfigLabel
  dataType?: DataType
  chart?: ChartOptions
  keys?: ConfigKey[]
  visible?: boolean
  doc?: string
}
