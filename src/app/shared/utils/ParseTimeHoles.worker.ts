export function ParseTimeHolesWorker({ dataset, timeFrame, timeInterval }) {
  const dataWithIds = dataset.reduce((acc, val) => {
    const time = new Date(val.startDateTime).getTime()
    return Object.assign(acc, { [time]: val.sample })
  }, {})

  const startTime = timeFrame.start
  const endTime = timeFrame.end
  const iterations = (endTime - startTime) / timeInterval

  const newDataset = []
  let prev = null

  // add null values if the previous value is not null
  for (let i = 0; i < iterations; i++) {
    const date = new Date(startTime + timeInterval * i)
    const sample = dataWithIds[date.getTime()] || null

    if (prev || i === 0 || (!prev && sample)) {
      newDataset.push({
        date,
        value: (sample && sample.value) || sample
      })
    }
    prev = sample
  }

  return newDataset
}
