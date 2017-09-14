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

export interface ConfigLabel {
  EN: string
}

export interface ConfigKey {
  key: string
  label: ConfigLabel
}

export interface ConfigUnit {
  label: ConfigLabel
}

export interface ConfigStat {
  label: ConfigLabel
}

export interface ConfigTimeInterval {
  value: number
  label: ConfigLabel
}
