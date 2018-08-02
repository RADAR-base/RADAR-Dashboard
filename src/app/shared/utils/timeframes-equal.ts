import { TimeFrame } from '../models/time.model'

export function timeFramesEqual(a: TimeFrame, b: TimeFrame) {
  if (a.startDateTime && b.startDateTime) {
    return (
      a.startDateTime.getTime() === b.startDateTime.getTime() &&
      a.endDateTime.getTime() === b.endDateTime.getTime()
    )
  } else {
    return false
  }
}
