import { AppConfig } from '../../shared/utils/config'

export function ParseTimeHoles(res, multi = false) {
  const interval = AppConfig.config.timeIntervals[res.header.timeFrame].value
  const timeFrame = res.header.effectiveTimeFrame
  const data = res.dataset

  const dataWithIds = data.reduce((acc, val) => {
    const time = new Date(val.startDateTime).getTime()
    return Object.assign(acc, { [time]: val.sample })
  }, {})

  const startTime = new Date(timeFrame.startDateTime).getTime()
  const endTime = new Date(timeFrame.endDateTime).getTime()
  const iterations = (endTime - startTime) / interval

  const newData = []

  for (let i = 0; i < iterations; i++) {
    const date = new Date(startTime + interval * i)
    const sample = dataWithIds[date.getTime()] || null

    multi
      ? newData.push({ date, sample })
      : newData.push({ date, value: sample && sample.value })
  }

  return newData
}
