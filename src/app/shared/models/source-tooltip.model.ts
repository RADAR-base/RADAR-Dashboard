import { ChartMultiValueObject } from './chart-data.model'
import { ConfigKey, ConfigLabel } from './config.model'

export interface SourceTooltipItem {
  id: number
  label: ConfigLabel
  dataType: string
  keys: ConfigKey[]
  value: number | ChartMultiValueObject | null
}
