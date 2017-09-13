import { ChartMultiValueObject } from './chart-data.model'
import { ConfigKey, Label } from './config.model'

export interface SourceTooltipItem {
  id: number
  label: Label
  dataType: string
  keys: ConfigKey[]
  value: number | ChartMultiValueObject | null
}
