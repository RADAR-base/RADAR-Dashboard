import { Source } from '../source/source.model'

export interface Subject {
  subjectId: string
  active: boolean
  effectiveTimeFrame: {
    endDateTime: string,
    startDateTime: string
  }
  sources: Source[]
}
