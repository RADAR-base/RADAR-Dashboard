import { MultiSample, SingleSample } from '../models/sample-data.model'

export function parseTimeHoles(dataset, timeFrame, timeWindow) {
  const startTime = new Date(timeFrame.start).getTime()
  const endTime = new Date(timeFrame.end).getTime()

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
