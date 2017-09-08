export function ParseTimeHolesWorker(object) {
  const dataset = object.dataset
  const timeFrame = object.timeFrame
  const isSingle: boolean = object.isSingle
  const interval = object.interval
  const keys = object.keys

  const dataWithIds = dataset.reduce((acc, val) => {
    const time = new Date(val.startDateTime).getTime()
    return Object.assign(acc, { [time]: val.sample })
  }, {})

  const startTime = timeFrame.start
  const endTime = timeFrame.end
  const iterations = (endTime - startTime) / interval

  const newDataset = []

  for (let i = 0; i < iterations; i++) {
    const date = new Date(startTime + interval * i)
    const sample = dataWithIds[date.getTime()] || null

    isSingle
      ? newDataset.push({ date, value: sample && sample.value })
      : newDataset.push({ date, sample })
  }

  if (isSingle) {
    return newDataset
  } else {
    const dates = []
    const values = keys.reduce(
      (acc, k) => Object.assign(acc, { [k.key]: [] }),
      {}
    )

    newDataset.map(data => {
      keys.map(k =>
        values[k.key].push(
          (data.sample && data.sample[k.key]) !== (null || undefined)
            ? data.sample && data.sample[k.key]
            : null
        )
      )
      dates.push(data.date)
    })
    return { keys, values, dates }
  }
}
