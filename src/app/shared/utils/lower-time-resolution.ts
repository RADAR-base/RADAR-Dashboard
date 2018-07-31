import { getTimeWindowEnumValue } from '../enums/time-window.enum'

export function lowerTimeResolution(a: String, b: String) {
  // NOTE: Return 1 for lower or equal resolution, 0 for higher.
  // Example: TEN_SEC is lower than ONE_WEEK

  if (getTimeWindowEnumValue(a) <= getTimeWindowEnumValue(b)) {
    return 1
  } else {
    return 0
  }
}
