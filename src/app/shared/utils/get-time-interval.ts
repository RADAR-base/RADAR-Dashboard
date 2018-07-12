import { TimeWindow } from '../enums/time-window.enum'
import { TimeFrame } from '../models/time.model'

export function getTimeInterval(timeFrame: TimeFrame) {
  const ONE_YEAR = TimeWindow['ONE_WEEK'] * 52
  const THREE_MONTHS = ONE_YEAR / 4
  const TWO_DAYS = ONE_YEAR / 365

  const difference =
    new Date(timeFrame.endDateTime).getTime() -
    new Date(timeFrame.startDateTime).getTime()

  switch (true) {
    case difference <= THREE_MONTHS && difference >= TimeWindow['ONE_WEEK']:
      return 'ONE_HOUR'
    case difference < TimeWindow['ONE_WEEK'] && difference >= TWO_DAYS:
      return 'TEN_MIN'
    case difference < TWO_DAYS && difference >= TimeWindow['ONE_HOUR']:
      return 'ONE_MIN'
    case difference < TimeWindow['ONE_HOUR'] &&
      difference >= TimeWindow['ONE_MINUTE']:
      return 'TEN_SECOND'
    case difference < TimeWindow['ONE_MINUTE']:
      return 'TEN_SECOND'
    default:
      return 'ONE_WEEK'
  }
}
