export interface Subject {
  subjectId: string
  active: boolean
  effectiveTimeFrame: {
    endDateTime: string,
    startDateTime: string
  }
  sources: any[]
}
