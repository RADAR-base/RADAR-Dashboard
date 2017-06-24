import { Label } from '../config/config.model'

export interface Sensor {
  id?: string
  source?: string
  keys?: Key[]
  unit: string
  label: Label
}

export interface Key {
  key: string
  label: Label
}
