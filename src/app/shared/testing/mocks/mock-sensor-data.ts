export const MockSensorMulti = {
  chart: {
    type: 'line'
  },
  dataType: 'multi',
  doc: 'Acceleration item for a dataset with gravitational constant g as unit.',
  keys: [
    {
      doc: 'Acceleration x axis with gravitational constant g as unit.',
      key: 'x',
      label: {
        EN: 'X Coord'
      }
    },
    {
      doc: 'Acceleration y axis with gravitational constant g as unit.',
      key: 'y',
      label: {
        EN: 'Y Coord'
      }
    },
    {
      doc: 'Acceleration z axis with gravitational constant g as unit.',
      key: 'z',
      label: {
        EN: 'Z Coord'
      }
    }
  ],
  label: {
    EN: 'Accelerometer'
  },
  unit: 'G',
  type: 'ACCELEROMETER',
  visible: true,
  source: '00:07:80:1F:52:F3',
  id: 4
}

export const MockSensorsOptions = {
  subjectId: 'MRC01',
  timeFrame: {
    start: 1497589120000,
    end: 1497628000000
  },
  timeInterval: 10000,
  descriptiveStatistic: 0
}

export const MockSensorsMany = [
  {
    chart: {
      type: 'line'
    },
    dataType: 'single',
    doc: 'Battery level in percentage as unit.',
    label: {
      EN: 'Battery'
    },
    unit: 'PERCENTAGE',
    type: 'BATTERY',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 0
  },
  {
    chart: {
      type: 'line'
    },
    dataType: 'single',
    doc: 'Time between individal heat beats.',
    label: {
      EN: 'Inter Beat Interval'
    },
    unit: 'BEATS_PER_MIN',
    type: 'INTER_BEAT_INTERVAL',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 1
  }
]

export const MockSensorsOne = [
  {
    chart: {
      type: 'line'
    },
    dataType: 'single',
    doc: 'Battery level in percentage as unit.',
    label: {
      EN: 'Battery'
    },
    unit: 'PERCENTAGE',
    type: 'BATTERY',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 0
  }
]

export const MockSensorsOneRaw = {
  header: {
    subjectId: 'MRC01',
    sourceId: '00:07:80:1F:52:F3',
    source: 'EMPATICA',
    sensor: 'BATTERY',
    descriptiveStatistic: 'AVERAGE',
    unit: 'PERCENTAGE',
    timeFrame: 'TEN_SECOND',
    effectiveTimeFrame: {
      startDateTime: '2017-06-16T08:59:40Z',
      endDateTime: '2017-06-16T12:04:20Z'
    }
  },
  dataset: [
    {
      sample: { value: 0.48716214 },
      startDateTime: '2017-06-16T08:59:40Z'
    },
    {
      sample: { value: 0.41315788 },
      startDateTime: '2017-06-16T09:05:10Z'
    },
    {
      sample: { value: 0.43157892999999997 },
      startDateTime: '2017-06-16T09:07:40Z'
    },
    {
      sample: { value: 0.35789472 },
      startDateTime: '2017-06-16T09:08:30Z'
    },
    { sample: { value: 0.3210526 }, startDateTime: '2017-06-16T09:12:00Z' },
    {
      sample: { value: 0.31447368928571423 },
      startDateTime: '2017-06-16T09:16:40Z'
    },
    {
      sample: { value: 0.29276315999999997 },
      startDateTime: '2017-06-16T09:21:20Z'
    },
    {
      sample: { value: 0.26644736785714285 },
      startDateTime: '2017-06-16T09:26:00Z'
    },
    { sample: { value: 0.3026316 }, startDateTime: '2017-06-16T09:30:10Z' },
    {
      sample: { value: 0.2213662642857143 },
      startDateTime: '2017-06-16T09:34:50Z'
    },
    {
      sample: { value: 0.19342105428571427 },
      startDateTime: '2017-06-16T09:39:30Z'
    },
    {
      sample: { value: 0.19671052785714285 },
      startDateTime: '2017-06-16T09:44:10Z'
    },
    {
      sample: { value: 0.18618421 },
      startDateTime: '2017-06-16T09:48:50Z'
    },
    {
      sample: { value: 0.12302631392857143 },
      startDateTime: '2017-06-16T09:53:30Z'
    },
    {
      sample: { value: 0.11639752892857144 },
      startDateTime: '2017-06-16T09:58:10Z'
    },
    {
      sample: { value: 0.12134705357142858 },
      startDateTime: '2017-06-16T10:02:50Z'
    },
    {
      sample: { value: 0.1101820525 },
      startDateTime: '2017-06-16T10:07:30Z'
    },
    {
      sample: { value: 0.11726390428571429 },
      startDateTime: '2017-06-16T10:12:10Z'
    },
    {
      sample: { value: 0.11644279071428572 },
      startDateTime: '2017-06-16T10:16:50Z'
    },
    {
      sample: { value: 0.11627774821428571 },
      startDateTime: '2017-06-16T10:21:30Z'
    },
    {
      sample: { value: 0.12059405928571429 },
      startDateTime: '2017-06-16T10:26:10Z'
    },
    {
      sample: { value: 0.11928147192857143 },
      startDateTime: '2017-06-16T10:30:50Z'
    },
    {
      sample: { value: 0.11855728621428571 },
      startDateTime: '2017-06-16T10:35:30Z'
    },
    {
      sample: { value: 0.11869306857142857 },
      startDateTime: '2017-06-16T10:40:10Z'
    },
    {
      sample: { value: 0.11747100492857143 },
      startDateTime: '2017-06-16T10:44:50Z'
    },
    {
      sample: { value: 0.1136237635 },
      startDateTime: '2017-06-16T10:49:30Z'
    },
    {
      sample: { value: 0.11448373599999999 },
      startDateTime: '2017-06-16T10:54:10Z'
    },
    {
      sample: { value: 0.11448373357142858 },
      startDateTime: '2017-06-16T10:58:50Z'
    },
    {
      sample: { value: 0.11371428742857144 },
      startDateTime: '2017-06-16T11:03:30Z'
    },
    {
      sample: { value: 0.11357850107142857 },
      startDateTime: '2017-06-16T11:08:10Z'
    },
    {
      sample: { value: 0.110410185 },
      startDateTime: '2017-06-16T11:12:50Z'
    },
    {
      sample: { value: 0.108373409 },
      startDateTime: '2017-06-16T11:17:30Z'
    },
    {
      sample: { value: 0.10746817514285714 },
      startDateTime: '2017-06-16T11:22:10Z'
    },
    {
      sample: { value: 0.10651768057142856 },
      startDateTime: '2017-06-16T11:26:50Z'
    },
    {
      sample: { value: 0.10236209535714284 },
      startDateTime: '2017-06-16T11:31:30Z'
    },
    {
      sample: { value: 0.10493352242857143 },
      startDateTime: '2017-06-16T11:36:10Z'
    },
    {
      sample: { value: 0.10552192278571429 },
      startDateTime: '2017-06-16T11:40:50Z'
    },
    {
      sample: { value: 0.09987270285714286 },
      startDateTime: '2017-06-16T11:45:30Z'
    },
    {
      sample: { value: 0.0760876965 },
      startDateTime: '2017-06-16T11:50:10Z'
    },
    {
      sample: { value: 0.0612390415 },
      startDateTime: '2017-06-16T11:54:50Z'
    },
    {
      sample: { value: 0.0904837375 },
      startDateTime: '2017-06-16T11:59:30Z'
    },
    {
      sample: { value: 0.10312305642857143 },
      startDateTime: '2017-06-16T12:04:10Z'
    }
  ]
}

export const MockSensorsOneProcessed = {
  data: [
    {
      date: new Date('2017-06-16T04:58:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T08:59:40.000Z'),
      value: 0.48716214
    },
    {
      date: new Date('2017-06-16T09:05:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:05:10.000Z'),
      value: 0.41315788
    },
    {
      date: new Date('2017-06-16T09:07:30.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:07:40.000Z'),
      value: 0.43157892999999997
    },
    {
      date: new Date('2017-06-16T09:08:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:08:30.000Z'),
      value: 0.35789472
    },
    {
      date: new Date('2017-06-16T09:11:50.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:12:00.000Z'),
      value: 0.3210526
    },
    {
      date: new Date('2017-06-16T09:16:30.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:16:40.000Z'),
      value: 0.31447368928571423
    },
    {
      date: new Date('2017-06-16T09:21:10.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:21:20.000Z'),
      value: 0.29276315999999997
    },
    {
      date: new Date('2017-06-16T09:25:50.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:26:00.000Z'),
      value: 0.26644736785714285
    },
    {
      date: new Date('2017-06-16T09:30:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:30:10.000Z'),
      value: 0.3026316
    },
    {
      date: new Date('2017-06-16T09:34:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:34:50.000Z'),
      value: 0.2213662642857143
    },
    {
      date: new Date('2017-06-16T09:39:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:39:30.000Z'),
      value: 0.19342105428571427
    },
    {
      date: new Date('2017-06-16T09:44:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:44:10.000Z'),
      value: 0.19671052785714285
    },
    {
      date: new Date('2017-06-16T09:48:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:48:50.000Z'),
      value: 0.18618421
    },
    {
      date: new Date('2017-06-16T09:53:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:53:30.000Z'),
      value: 0.12302631392857143
    },
    {
      date: new Date('2017-06-16T09:58:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T09:58:10.000Z'),
      value: 0.11639752892857144
    },
    {
      date: new Date('2017-06-16T10:02:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:02:50.000Z'),
      value: 0.12134705357142858
    },
    {
      date: new Date('2017-06-16T10:07:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:07:30.000Z'),
      value: 0.1101820525
    },
    {
      date: new Date('2017-06-16T10:12:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:12:10.000Z'),
      value: 0.11726390428571429
    },
    {
      date: new Date('2017-06-16T10:16:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:16:50.000Z'),
      value: 0.11644279071428572
    },
    {
      date: new Date('2017-06-16T10:21:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:21:30.000Z'),
      value: 0.11627774821428571
    },
    {
      date: new Date('2017-06-16T10:26:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:26:10.000Z'),
      value: 0.12059405928571429
    },
    {
      date: new Date('2017-06-16T10:30:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:30:50.000Z'),
      value: 0.11928147192857143
    },
    {
      date: new Date('2017-06-16T10:35:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:35:30.000Z'),
      value: 0.11855728621428571
    },
    {
      date: new Date('2017-06-16T10:40:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:40:10.000Z'),
      value: 0.11869306857142857
    },
    {
      date: new Date('2017-06-16T10:44:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:44:50.000Z'),
      value: 0.11747100492857143
    },
    {
      date: new Date('2017-06-16T10:49:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:49:30.000Z'),
      value: 0.1136237635
    },
    {
      date: new Date('2017-06-16T10:54:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:54:10.000Z'),
      value: 0.11448373599999999
    },
    {
      date: new Date('2017-06-16T10:58:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T10:58:50.000Z'),
      value: 0.11448373357142858
    },
    {
      date: new Date('2017-06-16T11:03:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:03:30.000Z'),
      value: 0.11371428742857144
    },
    {
      date: new Date('2017-06-16T11:08:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:08:10.000Z'),
      value: 0.11357850107142857
    },
    {
      date: new Date('2017-06-16T11:12:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:12:50.000Z'),
      value: 0.110410185
    },
    {
      date: new Date('2017-06-16T11:17:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:17:30.000Z'),
      value: 0.108373409
    },
    {
      date: new Date('2017-06-16T11:22:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:22:10.000Z'),
      value: 0.10746817514285714
    },
    {
      date: new Date('2017-06-16T11:26:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:26:50.000Z'),
      value: 0.10651768057142856
    },
    {
      date: new Date('2017-06-16T11:31:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:31:30.000Z'),
      value: 0.10236209535714284
    },
    {
      date: new Date('2017-06-16T11:36:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:36:10.000Z'),
      value: 0.10493352242857143
    },
    {
      date: new Date('2017-06-16T11:40:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:40:50.000Z'),
      value: 0.10552192278571429
    },
    {
      date: new Date('2017-06-16T11:45:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:45:30.000Z'),
      value: 0.09987270285714286
    },
    {
      date: new Date('2017-06-16T11:50:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:50:10.000Z'),
      value: 0.0760876965
    },
    {
      date: new Date('2017-06-16T11:54:40.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:54:50.000Z'),
      value: 0.0612390415
    },
    {
      date: new Date('2017-06-16T11:59:20.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T11:59:30.000Z'),
      value: 0.0904837375
    },
    {
      date: new Date('2017-06-16T12:04:00.000Z'),
      value: null
    },
    {
      date: new Date('2017-06-16T12:04:10.000Z'),
      value: 0.10312305642857143
    },
    {
      date: new Date('2017-06-16T15:46:40.000Z'),
      value: null
    }
  ],
  sensor: {
    chart: {
      type: 'line'
    },
    dataType: 'single',
    doc: 'Battery level in percentage as unit.',
    label: {
      EN: 'Battery'
    },
    unit: 'PERCENTAGE',
    type: 'BATTERY',
    visible: true,
    source: '00:07:80:1F:52:F3',
    id: 0
  }
}
