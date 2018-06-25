import { SourceData } from './source-data.model'
import { EffectiveTimeFrame } from './time.model'

export interface Source {
  sourceId: string
  sourceName: string
  sourceTypeId: string | number
  sourceTypeProducer: string
  sourceTypeModel: string
  sourceTypeCatalogVersion: string
  assigned: boolean
  status: string
  effectiveTimeFrame: EffectiveTimeFrame
  sourceData?: SourceData[]
}
