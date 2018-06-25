import { SourceType } from './source-type.model'

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
