export enum TimeWindow {
  TEN_SECOND = 10000,
  THIRTY_SECOND = 30000,
  ONE_MIN = 60000,
  TEN_MIN = 600000,
  ONE_HOUR = 3600000,
  ONE_DAY = 86400000,
  ONE_WEEK = 604800000
}

export function getTimeWindowEnumValue(key) {
  return TimeWindow[key]
}

export function isLowerTimeResolution(a: String, b: String) {
  // NOTE: Return 1 for lower or equal resolution, 0 for higher.
  // Example: TEN_SEC is lower than ONE_WEEK

  if (getTimeWindowEnumValue(a) <= getTimeWindowEnumValue(b)) {
    return 1
  } else {
    return 0
  }
}
