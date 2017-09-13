import { Sensor } from '../store/sensors/sensors.model'

export interface Config {
  sensors: {
    [id: string]: Sensor
  }
  units: {
    [id: string]: ConfigUnit
  }
  stats: {
    [id: string]: ConfigStat
  }
  timeIntervals: {
    [id: string]: ConfigTimeInterval
  }
  specs: string[]
  compliance: {
    keys: ConfigKey[]
  }
}

export interface Label {
  EN: string
}

export interface ConfigKey {
  key: string
  label: Label
}

export interface ConfigUnit {
  label: Label
}

export interface ConfigStat {
  label: Label
}

export interface ConfigTimeInterval {
  value: number
  label: Label
}
