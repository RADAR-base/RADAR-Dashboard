import { Key, Label } from '../../models/config.model'

export interface Sensor {
  id?: string
  source?: string
  keys?: Key[]
  type?: string
  visible?: boolean
  unit: string
  label: Label
  dataType: DataTypes
  chart: ChartOptions
}

export interface ChartOptions {
  type: ChartTypes
  gradient: boolean
}

export enum DataTypes {
  multi = 'multi',
  single = 'single'
}

export enum ChartTypes {
  line = 'line',
  bar = 'bar'
}
