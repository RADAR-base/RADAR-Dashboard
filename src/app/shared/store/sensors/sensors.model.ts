import { ConfigKey, ConfigLabel } from '../../models/config.model'

export interface Sensor {
  id?: string
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

export enum TimeInterval {
  TEN_SECOND = 10000,
  THIRTY_SECOND = 30000,
  ONE_MIN = 60000,
  TEN_MIN = 600000,
  ONE_HOUR = 3600000,
  ONE_DAY = 86400000,
  ONE_WEEK = 604800000
}

export enum DescriptiveStatistic {
  AVERAGE,
  COUNT,
  MAXIMUM,
  MEDIAN,
  MINIMUM,
  SUM,
  INTERQUARTILE_RANGE,
  LOWER_QUARTILE,
  UPPER_QUARTILE,
  QUARTILES,
  RECEIVED_MESSAGES
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
