export const MockHRData = {
  header: {
    subjectId: 'MRC02',
    sourceId: '00:07:80:1F:52:D7',
    source: 'EMPATICA',
    sensor: 'BATTERY',
    descriptiveStatistic: 'AVERAGE',
    unit: 'PERCENTAGE',
    timeFrame: 'TEN_SECOND',
    effectiveTimeFrame: {
      startDateTime: '2016-10-27T20:02:20Z',
      endDateTime: '2016-10-27T20:03:10Z'
    }
  },
  dataset: [
    {
      startDateTime: '2016-10-27T20:02:20Z',
      sample: {
        value: 60.17274154968215
      }
    },
    {
      startDateTime: '2016-10-27T20:03:00Z',
      sample: {
        value: 108.39180563508566
      }
    },
    {
      startDateTime: '2016-10-27T20:03:10Z',
      sample: {
        value: 135.30344544328108
      }
    }
  ]
}
