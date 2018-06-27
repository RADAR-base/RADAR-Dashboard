import { EffectiveTimeFrame } from '../../models/sample-data.model'

export const MockAccelerationTimeInterval = 'TEN_SECOND'

export const MockAccelerationKeys = {
  chart: {
    type: 'line',
    dataType: 'multi'
  },
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

export const MockAcceleration = {
  header: {
    subjectId: 'KCLTest0',
    sourceId: '00:07:80:1F:52:F3',
    source: 'EMPATICA',
    sensor: 'ACCELEROMETER',
    descriptiveStatistic: 'AVERAGE',
    unit: 'G',
    timeFrame: 'TEN_SECOND',
    effectiveTimeFrame: {
      startDateTime: '2017-02-27T11:46:00Z',
      endDateTime: '2017-02-27T11:54:10Z'
    }
  },
  dataset: [
    {
      value: {
        x: -0.14003537735849056,
        y: -0.05910966981132076,
        z: 1.0141509433962264
      },
      startDateTime: '2017-02-27T11:46:00Z'
    },
    {
      value: {
        x: -0.178999606918239,
        y: -0.06313875786163523,
        z: 1.0051591981132075
      },
      startDateTime: '2017-02-27T11:46:50Z'
    },
    {
      value: {
        x: -0.17035180817610063,
        y: -0.05699685534591195,
        z: 1.0070754716981132
      },
      startDateTime: '2017-02-27T11:47:10Z'
    },
    {
      value: {
        x: -0.1416568396226415,
        y: -0.0482999213836478,
        z: 1.0098270440251573
      },
      startDateTime: '2017-02-27T11:47:20Z'
    },
    {
      value: {
        x: -0.03282232704402516,
        y: -0.06132075471698113,
        z: 1.017934355345912
      },
      startDateTime: '2017-02-27T11:47:40Z'
    },
    {
      value: {
        x: -0.13261595911949686,
        y: -0.07208136792452831,
        z: 1.0114976415094339
      },
      startDateTime: '2017-02-27T11:47:50Z'
    },
    {
      value: {
        x: -0.15678047839506173,
        y: -0.055169753086419755,
        z: 1.0081500771604939
      },
      startDateTime: '2017-02-27T11:48:30Z'
    },
    {
      value: {
        x: -0.03473860062893082,
        y: -0.06279481132075472,
        z: 1.0194084119496856
      },
      startDateTime: '2017-02-27T11:48:40Z'
    },
    {
      value: {
        x: -0.09119496855345911,
        y: -0.05571933962264151,
        z: 1.016755110062893
      },
      startDateTime: '2017-02-27T11:49:40Z'
    },
    {
      value: {
        x: -0.11178626543209877,
        y: -0.04909336419753087,
        z: 1.0139371141975309
      },
      startDateTime: '2017-02-27T11:50:00Z'
    },
    {
      value: {
        x: -0.15507075471698112,
        y: -0.0596501572327044,
        z: 1.00967963836478
      },
      startDateTime: '2017-02-27T11:50:10Z'
    },
    {
      value: {
        x: -0.13256682389937108,
        y: -0.05198506289308176,
        z: 1.009188286163522
      },
      startDateTime: '2017-02-27T11:50:20Z'
    },
    {
      value: {
        x: -0.1726120283018868,
        y: -0.0504127358490566,
        z: 1.0072720125786163
      },
      startDateTime: '2017-02-27T11:50:50Z'
    },
    {
      value: {
        x: -0.1550925925925926,
        y: -0.07286844135802469,
        z: 1.0090663580246915
      },
      startDateTime: '2017-02-27T11:51:00Z'
    },
    {
      value: {
        x: -0.18745086477987422,
        y: -0.04943003144654088,
        z: 1.0041764937106918
      },
      startDateTime: '2017-02-27T11:51:20Z'
    },
    {
      value: {
        x: -0.19507137345679013,
        y: -0.04325810185185185,
        z: 1.0052083333333333
      },
      startDateTime: '2017-02-27T11:51:30Z'
    },
    {
      value: {
        x: -0.1676493710691824,
        y: -0.0667747641509434,
        z: 1.0066332547169812
      },
      startDateTime: '2017-02-27T11:51:40Z'
    },
    {
      value: {
        x: -0.15359669811320756,
        y: -0.057340801886792456,
        z: 1.0098270440251573
      },
      startDateTime: '2017-02-27T11:51:50Z'
    },
    {
      value: {
        x: -0.1521508487654321,
        y: -0.051745756172839504,
        z: 1.0108506944444444
      },
      startDateTime: '2017-02-27T11:52:00Z'
    },
    {
      value: {
        x: -0.0827437106918239,
        y: -0.03419811320754717,
        z: 1.014249213836478
      },
      startDateTime: '2017-02-27T11:52:10Z'
    },
    {
      value: {
        x: -0.11669614779874214,
        y: -0.044270833333333336,
        z: 1.0127751572327044
      },
      startDateTime: '2017-02-27T11:52:20Z'
    },
    {
      value: {
        x: -0.1722189465408805,
        y: -0.06647995283018868,
        z: 1.0050117924528301
      },
      startDateTime: '2017-02-27T11:52:40Z'
    },
    {
      value: {
        x: -0.18229166666666666,
        y: -0.06078026729559748,
        z: 1.0041273584905661
      },
      startDateTime: '2017-02-27T11:52:50Z'
    },
    {
      value: {
        x: -0.10325038580246913,
        y: -0.05473572530864197,
        z: 1.0152874228395061
      },
      startDateTime: '2017-02-27T11:53:00Z'
    },
    {
      value: {
        x: -0.02437106918238994,
        y: -0.06574292452830188,
        z: 1.0164111635220126
      },
      startDateTime: '2017-02-27T11:53:10Z'
    },
    {
      value: {
        x: -0.08613404088050315,
        y: -0.04186320754716981,
        z: 1.016312893081761
      },
      startDateTime: '2017-02-27T11:53:20Z'
    },
    {
      value: {
        x: -0.11873070987654322,
        y: -0.04933449074074074,
        z: 1.0119598765432098
      },
      startDateTime: '2017-02-27T11:53:30Z'
    },
    {
      value: {
        x: -0.16524174528301888,
        y: -0.03542649371069182,
        z: 1.0104166666666667
      },
      startDateTime: '2017-02-27T11:53:40Z'
    },
    {
      value: {
        x: -0.1594437893081761,
        y: 0.0060436320754716985,
        z: 1.0119398584905661
      },
      startDateTime: '2017-02-27T11:53:50Z'
    },
    {
      value: {
        x: -0.1486304012345679,
        y: -0.010754243827160493,
        z: 1.011622299382716
      },
      startDateTime: '2017-02-27T11:54:00Z'
    },
    {
      value: {
        x: -0.1391509433962264,
        y: -0.04549921383647799,
        z: 1.0133647798742138
      },
      startDateTime: '2017-02-27T11:54:10Z'
    }
  ]
}

export const MockAccelerationTimeFrame: EffectiveTimeFrame = {
  startDateTime: '2017-02-27T11:46:00Z',
  endDateTime: '2017-02-27T11:54:10Z'
}
