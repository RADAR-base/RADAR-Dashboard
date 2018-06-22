import { SourceData } from './source-data.model'

export interface SourceType {
  id: number | string
  producer: string
  model: string
  catalogVersion: string
  sourceTypeScope: string
  canRegisterDynamically: boolean
  name?: string
  description?: string
  sourceData: SourceData[]
  appProvider?: string
}
