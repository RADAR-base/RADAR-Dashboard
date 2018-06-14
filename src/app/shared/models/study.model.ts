export interface Study {
  id: number
  projectName: string
  description: string
  location: string
  projectStatus?: string
  sourceTypes: SourceType[]
  attributes: Attribute[]
  organization?: string
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
