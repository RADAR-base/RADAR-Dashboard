import { Source } from './source.model'

export interface Subject {
  subjectId: string
  status: string
  humanReadableId: string
  projectName: string
  lastSeen: string
  sources: Source[]
}
