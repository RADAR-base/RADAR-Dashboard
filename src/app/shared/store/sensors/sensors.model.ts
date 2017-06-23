import { Label } from '../config/config.model'

export interface Sensor {
  keys?: Key[],
  unit: string,
  label: Label
}

export interface Key {
  key: string
  label: Label
}
