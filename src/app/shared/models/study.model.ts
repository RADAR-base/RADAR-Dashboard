export interface Study {
  id: number | string
  projectName?: string
  description?: string
  location?: string
  projectStatus?: string
  sourceTypes?: SourceType[]
  attributes?: Attribute[]
  organization?: string

  // TODO: remove after API migration
  name?: string
}

interface Attribute {
  key: string
  value: string
}

interface SourceType {
  producer: string
  model: string
  catalogVersion: string
  sourceTypeScope: string
  canRegisterDynamically: boolean
  name?: string
  description?: string
  sourceData: Source[]
  appProvider?: string
}

interface Source {
  sourceDataType: string
  sourceDataName: string
  keySchema: string
  valueSchema: string
  topic: string
  enabled: boolean
  unit?: string
  frequency?: string
  provider?: string
  processingState?: string
}
