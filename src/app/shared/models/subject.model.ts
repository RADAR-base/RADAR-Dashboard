import { Source } from './study.model'

export interface Subject {
  subjectId: string
  status: string
  humanReadableId: string
  projectName: string
  lastSeen: string
  sources: Source[]
}
