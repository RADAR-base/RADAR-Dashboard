import { ConfigKey, ConfigLabel } from '../../../shared/models/config.model'

export interface Study {
  id: string
  name: string
}

export interface Subject {
  subjectId: string
  active: boolean
  effectiveTimeFrame: {
    endDateTime: string
    startDateTime: string
  }
  sources: Source[]
}

export interface Source {
  id: string
  type: string
  summary?: string
  visible?: boolean
  sensors?: Sensor[]
}

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
