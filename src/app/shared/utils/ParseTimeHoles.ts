export function ParseTimeHoles(dataset, timeFrame, timeInterval) {
  const startTime = timeFrame.start
  const endTime = timeFrame.end

  return dataset.reduce((acc, d, i, arr) => {
    const date = new Date(d.startDateTime)
    const value = d.sample.value || d.sample

    if (i === 0) {
      // --> First value
      if (date.getTime() !== startTime) {
        acc.push({ date: new Date(startTime), value: null })
      }
      acc.push({ date, value })
    } else if (i < arr.length - 1) {
      // --> In-between values
      const prev = acc[acc.length - 1]
      const prevDateCheck = date.getTime() - timeInterval
      const dateCheck = prev.date.getTime() === prevDateCheck

      if (prev.value && !dateCheck) {
        acc.push({ date: new Date(prevDateCheck), value: null })
      }
      acc.push({ date, value })
    } else {
      // --> Last value
      acc.push({ date, value })
      if (date.getTime() !== endTime) {
        acc.push({ date: new Date(endTime), value: null })
      }
    }
    return acc
  }, [])
}
