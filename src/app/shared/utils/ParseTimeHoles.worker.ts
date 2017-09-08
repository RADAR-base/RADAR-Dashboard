export function ParseTimeHolesWorker({
  dataset,
  timeFrame,
  isSingle,
  timeInterval,
  keys
}) {
  const dataWithIds = dataset.reduce((acc, val) => {
    const time = new Date(val.startDateTime).getTime()
    return Object.assign(acc, { [time]: val.sample })
  }, {})

  const startTime = timeFrame.start
  const endTime = timeFrame.end
  const iterations = (endTime - startTime) / timeInterval

  const newDataset = []

  for (let i = 0; i < iterations; i++) {
    const sample = dataWithIds[startTime + timeInterval * i] || null
    newDataset[i] = (sample && sample.value) || sample
  }

  return newDataset
}
