import { Source } from './source.model'

export interface Subject {
  id: number
  login: string
  status: string
  externalId: string
  project: any
  sources: Source[]
  createdDate: Date
  createdBy: string
  lastModifiedDate: Date
  lastModifiedBy: string
}
