import { TimeWindow } from '../enums/time-window.enum'
import { TimeFrame } from '../models/time.model'

export function getTimeInterval(timeFrame: TimeFrame) {
  const ONE_YEAR = TimeWindow['ONE_WEEK'] * 52
  const THREE_MONTHS = ONE_YEAR / 4
  const TWO_DAYS = (ONE_YEAR / 365) * 2
  const TWO_WEEKS = TimeWindow['ONE_WEEK'] * 2

  const difference =
    timeFrame.endDateTime.getTime() - timeFrame.startDateTime.getTime()

  switch (true) {
    case difference <= THREE_MONTHS && difference >= TWO_WEEKS:
      return 'ONE_HOUR'
    case difference < TWO_WEEKS && difference >= TWO_DAYS:
      return 'TEN_MIN'
    case difference < TWO_DAYS && difference >= TimeWindow['ONE_HOUR']:
      return 'ONE_MIN'
    case difference < TimeWindow['ONE_HOUR'] && difference > 0:
      return 'TEN_SECOND'
    default:
      return 'ONE_DAY'
  }
}
