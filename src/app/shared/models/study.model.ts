import { SourceType } from './source-type.model'

export interface Study {
  id: number | string
  projectName?: string
  humanReadableProjectName?: string
  description?: string
  location?: string
  projectStatus?: string
  sourceTypes?: SourceType[]
  attributes?: Attribute[]
  organization?: string
}

interface Attribute {
  key: string
  value: string
}
