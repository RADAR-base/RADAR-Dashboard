import { TimeWindow } from '../enums/time-window.enum'
import { ChartData } from '../models/chart-data.model'
import { MultiSample, SingleSample } from '../models/sample-data.model'
import { EffectiveTimeFrame } from '../models/time.model'

export function parseTimeHoles(
  dataset: ChartData[],
  effectiveTimeFrame: EffectiveTimeFrame,
  timeWindowEnum: string,
  timeHoles = true
) {
  if (timeHoles === false) {
    return dataset.reduce((acc, d: SingleSample | MultiSample, i, arr) => {
      const date = new Date(d.startDateTime)

      // --> Add the current dataset value
      acc.push({ date, value: d.value })

      return acc
    }, [])
  }

  const startTime = new Date(effectiveTimeFrame.startDateTime).getTime()
  const endTime = new Date(effectiveTimeFrame.endDateTime).getTime()
  const timeWindow: TimeWindow = TimeWindow[timeWindowEnum]

  return dataset.reduce((acc, d: SingleSample | MultiSample, i, arr) => {
    const prev = acc[acc.length - 1]
    const date = new Date(d.startDateTime)
    const dateBefore = date.getTime() - timeWindow
    const dateCheck = prev && prev.date.getTime() === dateBefore

    // --> Add first timehole
    if (!prev && date.getTime() !== startTime) {
      acc.push({ date: new Date(startTime), value: null })
    }

    // --> Add timeholes
    if (prev && prev.value !== undefined && !dateCheck) {
      acc.push({ date: new Date(dateBefore), value: null })
    }

    // --> Add the current dataset value
    acc.push({ date, value: d.value })

    // --> Add last timehole
    if (i === arr.length - 1 && date.getTime() !== endTime) {
      acc.push({ date: new Date(endTime), value: null })
    }

    return acc
  }, [])
}
