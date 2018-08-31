export const MockCompliance = {
  header: {
    subjectId: 'KCLTest0',
    sourceId: '00:07:80:1F:52:F3',
    source: 'EMPATICA',
    sensor: 'COMPLIANCE',
    descriptiveStatistic: 'AVERAGE',
    unit: 'G',
    timeWindow: 'ONE_DAY',
    effectiveTimeFrame: {
      startDateTime: '2017-02-27T11:46:00Z',
      endDateTime: '2017-03-02T11:46:00Z'
    }
  },
  dataset: [
    {
      value: {
        simple: 0.2348,
        special: 0
      },
      startDateTime: '2017-02-27T11:46:00Z'
    },
    {
      value: {
        simple: 0.7348,
        special: 0.823
      },
      startDateTime: '2017-03-01T11:46:00Z'
    },
    {
      value: {
        simple: 0.3348,
        special: 0.323
      },
      startDateTime: '2017-03-02T11:46:00Z'
    }
  ]
}

export const MockComplianceExpected = [
  {
    date: new Date('2017-02-27T11:46:00Z'),
    value: { simple: 0.2348, special: 0 }
  },
  { date: new Date('2017-02-28T11:46:00Z'), value: null },
  {
    date: new Date('2017-03-01T11:46:00Z'),
    value: { simple: 0.7348, special: 0.823 }
  },
  {
    date: new Date('2017-03-02T11:46:00Z'),
    value: { simple: 0.3348, special: 0.323 }
  }
]
