import { TimeWindow } from '../enums/time-window.enum'
import { TimeFrame } from '../models/time.model'

export function getTimeInterval(timeFrame: TimeFrame) {
  const ONE_YEAR = TimeWindow['ONE_WEEK'] * 52
  const TWO_MONTHS = ONE_YEAR / 6
  const ONE_DAY = TimeWindow['ONE_DAY']
  const FORTY_DAYS = ONE_DAY * 40
  const TWO_HOURS = TimeWindow['ONE_HOUR'] * 2
  const SIXTEEN_HOURS = TWO_HOURS * 8
  const SIXTEEN_MINUTES = TimeWindow['ONE_MIN'] * 16

  const difference =
    timeFrame.endDateTime.getTime() - timeFrame.startDateTime.getTime()

  switch (true) {
    case difference <= FORTY_DAYS &&
      difference >= TimeWindow['ONE_WEEK'] - TWO_HOURS:
      return 'ONE_HOUR'
    case difference < TimeWindow['ONE_WEEK'] - TWO_HOURS &&
      difference >= SIXTEEN_HOURS:
      return 'TEN_MIN'
    case difference < SIXTEEN_HOURS && difference >= SIXTEEN_MINUTES:
      return 'ONE_MIN'
    case difference < SIXTEEN_MINUTES && difference > 0:
      return 'TEN_SECOND'
    default:
      return 'ONE_DAY'
  }
}
