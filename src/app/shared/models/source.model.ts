import { Sensor } from './sensor.model'

export interface Source {
  id: string
  type: string
  summary?: string
  visible?: boolean
  sensors?: Sensor[]
}
