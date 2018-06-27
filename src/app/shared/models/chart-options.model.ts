import { ChartType } from '../enums/chart-type.enum'
import { DataType } from '../enums/data-type.enum'

export interface ChartOptions {
  type: ChartType
  gradient?: boolean
  timeHoles?: boolean
  dataType?: DataType
}
