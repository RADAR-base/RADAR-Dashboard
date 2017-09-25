import { ConfigKey, ConfigLabel } from '../../models/config.model'

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

export interface ChartOptions {
  type: ChartType
  gradient: boolean
}

export enum DataType {
  multi = 'multi',
  single = 'single'
}

export enum ChartType {
  line = 'line',
  bar = 'bar'
}

export enum SensorType {
  ACCELEROMETER,
  BATTERY,
  BLOOD_VOLUME_PULSE,
  ELECTRODERMAL_ACTIVITY,
  INTER_BEAT_INTERVAL,
  HEART_RATE,
  THERMOMETER
}
