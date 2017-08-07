export function ParseMultiValueData (dataset, keys, timeHoles) {
  const dates: Date[] = []
  const values: { [key: string]: number[] } = keys.reduce(
    (acc, k) => ({ ...acc, [k.key]: [] }), {}
  )

  dataset.map(data => {
    keys.map((k) => values[k.key].push(((data.sample && data.sample[k.key]) !== (null || undefined))
                                  ? data.sample && data.sample[k.key] : null))
    dates.push(timeHoles
      ? data.date
      : new Date(data.startDateTime))
  })
  return { keys, values, dates }
}
