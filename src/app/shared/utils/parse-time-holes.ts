export function parseTimeHoles(dataset, timeFrame, timeInterval) {
  const startTime = timeFrame.start
  const endTime = timeFrame.end

  return dataset.reduce((acc, d, i, arr) => {
    const prev = acc[acc.length - 1]
    const date = new Date(d.startDateTime)
    const value = d.sample.value === undefined ? d.sample : d.sample.value
    const dateBefore = date.getTime() - timeInterval
    const dateCheck = prev && prev.date.getTime() === dateBefore

    // --> Add first timehole
    if (!prev && date.getTime() !== startTime) {
      acc.push({ date: new Date(startTime), value: null })
    }

    // --> Add timeholes
    if (prev && prev.value && !dateCheck) {
      acc.push({ date: new Date(dateBefore), value: null })
    }

    // --> Add the current dataset value
    acc.push({ date, value })

    // --> Add last timehole
    if (i === arr.length - 1 && date.getTime() !== endTime) {
      acc.push({ date: new Date(endTime), value: null })
    }

    return acc
  }, [])
}
