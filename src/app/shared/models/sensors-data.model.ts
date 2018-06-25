import { ChartData } from '../../shared/models/chart-data.model'
import { Sensor } from '../../shared/models/sensor.model'

export interface SensorsData extends Sensor {
  data: ChartData[]
}
