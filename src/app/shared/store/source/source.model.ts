import { Sensor } from '../sensors/sensors.model'

export interface Source {
  id: string
  type: string
  summary?: string
  visible?: boolean
  sensors?: Sensor[]
}
