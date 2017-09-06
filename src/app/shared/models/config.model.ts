import {
  ChartGradientColors,
  ChartMargin
} from '../../components/charts/chart.model'
import { Sensor } from '../store/sensors/sensors.model'

export interface Config {
  sensors: {
    [id: string]: Sensor
  }
  units: {
    [id: string]: Unit
  }
  stats: {
    [id: string]: Stat
  }
  timeIntervals: {
    [id: string]: TimeInterval
  }
  specs: string[]
  compliance: {
    keys: Key[]
  }
}

export interface ConfigCharts {
  MARGIN: ChartMargin
  GRADIENT_COLORS: ChartGradientColors[]
  GRADIENT_STOPS: any
  CATEGORICAL_COLORS: string[]
}

export interface Label {
  EN: string
}

export interface Key {
  key: string
  label: Label
}

export interface Unit {
  label: Label
}

export interface Stat {
  label: Label
}

export interface TimeInterval {
  value: number
  label: Label
}
