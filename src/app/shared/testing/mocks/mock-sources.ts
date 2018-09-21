import { ChartType } from '../../enums/chart-type.enum'
import { DataType } from '../../enums/data-type.enum'
import { SourceData } from '../../models/source-data.model'
import { Source } from '../../models/source.model'

export const MockSensorsOptions = {
  studyName: 'Test-Project',
  subjectId: '83531d82-959b-11e8-9eb6-529269fb1459',
  timeFrame: { startDateTime: null, endDateTime: null },
  timeWindow: 'ONE_MIN',
  descriptiveStatistic: 3,
  queryParams: {}
}

export const MockVolumeOptions = {
  studyName: 'RADAR_TEST-PROJECT',
  subjectId: 'eb0daaa0-958c-11e8-9eb6-529269fb1459',
  timeFrame: {
    startDateTime: new Date('2018-05-31T23:00:00.000Z'),
    endDateTime: new Date('2018-07-27T13:45:12.251Z')
  },
  timeWindow: 'ONE_WEEK',
  descriptiveStatistic: 11,
  queryParams: {}
}

export const MockVolumeSources = {
  '3a60f224-958d-11e8-9eb6-529269fb1459': {
    assigned: true,
    effectiveTimeFrame: {
      startDateTime: '2018-06-12T23:18:53.075Z',
      endDateTime: '2018-07-27T11:08:28.255Z'
    },
    sourceId: '3a60f224-958d-11e8-9eb6-529269fb1459',
    sourceName: 'PHONE-d0f13010',
    sourceTypeCatalogVersion: 'v1',
    sourceTypeId: 1003,
    sourceTypeModel: 'PHONE',
    sourceTypeProducer: 'ANDROID',
    status: 'CONNECTED',

    sourceData: [
      {
        sourceDataName: 'ANDROID_PHONE_v1_PHONE_SMS_UNREAD',
        sourceDataType: 'PHONE_SMS_UNREAD'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_RELATIVE_LOCATION',
        sourceDataType: 'RELATIVE_LOCATION'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_BATTERY',
        sourceDataType: 'BATTERY'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_USAGE_EVENT',
        sourceDataType: 'USAGE_EVENT'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_USER_INTERACTION',
        sourceDataType: 'USER_INTERACTION'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_PHONE_SMS',
        sourceDataType: 'PHONE_SMS'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_STEP_COUNT',
        sourceDataType: 'STEP_COUNT'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_PHONE_BLUETOOTH_DEVICES',
        type: 'PHONE_BLUETOOTH_DEVICES'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_PHONE_CONTACTS',
        sourceDataType: 'PHONE_CONTACTS'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_ACCELEROMETER',
        sourceDataType: 'ACCELEROMETER'
      },
      { sourceDataName: 'ANDROID_PHONE_v1_LIGHT', sourceDataType: 'LIGHT' },
      {
        sourceDataName: 'ANDROID_PHONE_v1_PHONE_CALL',
        sourceDataType: 'PHONE_CALL'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_GYROSCOPE',
        sourceDataType: 'GYROSCOPE'
      },
      {
        sourceDataName: 'ANDROID_PHONE_v1_MAGNETIC_FIELD',
        sourceDataType: 'MAGNETIC_FIELD'
      }
    ]
  }
}

export const MockVolumeAPIResponse = {
  header: {
    projectName: 'RADAR_TEST-PROJECT',
    subjectId: 'eb0daaa0-958c-11e8-9eb6-529269fb1459',
    maximumCount: 2,
    timeFrame: {
      startDateTime: new Date('2018-05-31T23:00:00Z'),
      endDateTime: new Date('2018-07-27T13:45:12.251Z')
    },
    timeWindow: 'ONE_WEEK',
    statistic: 'DISTINCT'
  },
  dataset: [
    { value: 2, startDateTime: '2018-05-31T23:00:00Z' },
    { value: 2, startDateTime: '2018-06-07T23:00:00Z' },
    { value: 2, startDateTime: '2018-06-14T23:00:00Z' },
    { value: 1, startDateTime: '2018-06-21T23:00:00Z' },
    { value: 1, startDateTime: '2018-06-28T23:00:00Z' },
    { value: 1, startDateTime: '2018-07-05T23:00:00Z' },
    { value: 1, startDateTime: '2018-07-12T23:00:00Z' },
    { value: 1, startDateTime: '2018-07-19T23:00:00Z' }
  ]
}

export const MockSourceData: SourceData = {
  id: 10990,
  sourceDataType: 'ELECTRODERMAL_ACTIVITY',
  sourceDataName: 'EMPATICA_E4_1.0.0_ELECTRODERMAL_ACTIVITY',
  frequency: '4.0',
  unit: 'MICRO_SIEMENS',
  processingState: 'RAW',
  keySchema: 'org.radarcns.kafka.ObservationKey',
  valueSchema: 'org.radarcns.passive.empatica.EmpaticaE4ElectroDermalActivity',
  topic: 'android_empatica_e4_electrodermal_activity',
  enabled: true,
  uid: 'rJywbfpZm',
  sourceId: 'fedd672e-959a-11e8-9eb6-529269fb1459',
  chart: { type: ChartType.line, dataType: DataType.single },
  label: { EN: 'Electrodermal Activity' },
  visible: true
}

export const MockSources: Source[] = [
  {
    sourceId: 'fedd672e-959a-11e8-9eb6-529269fb1459',
    sourceName: 'A003C9',
    sourceTypeId: 10855,
    sourceTypeProducer: 'EMPATICA',
    sourceTypeModel: 'E4',
    sourceTypeCatalogVersion: '1.0.0',
    assigned: true,
    status: 'DISCONNECTED',
    effectiveTimeFrame: {
      startDateTime: new Date('2000-01-01T00:00:00Z'),
      endDateTime: new Date('2000-01-01T00:10:00Z')
    },
    sourceData: [MockSourceData]
  }
]

export const MockSensors = [MockSourceData]

export const MockSensorDataAPIResponse = {
  header: {
    subjectId: '83531d82-959b-11e8-9eb6-529269fb1459',
    sourceId: 'fedd672e-959a-11e8-9eb6-529269fb1459',
    projectId: 'Test-Project',
    sourceType: 'EMPATICA_E4_1.0.0',
    sourceDataType: 'ELECTRODERMAL_ACTIVITY',
    descriptiveStatistic: 'MEDIAN',
    unit: 'MICRO_SIEMENS',
    timeWindow: 'ONE_MIN',
    effectiveTimeFrame: {
      startDateTime: '2000-01-01T00:00:00Z',
      endDateTime: '2000-01-01T00:10:00Z'
    }
  },
  dataset: [
    {
      startDateTime: '2000-01-01T00:01:00.000Z',
      value: 0.48716214
    },
    {
      startDateTime: '2000-01-01T00:03:00.000Z',
      value: 0.41315788
    },
    {
      startDateTime: '2000-01-01T00:04:00.000Z',
      value: 0.43157892999999997
    },
    {
      startDateTime: '2000-01-01T00:07:00.000Z',
      value: 0
    }
  ]
}

export const MockSensorDataResult = {
  data: [
    {
      date: new Date('2000-01-01T00:00:00.000Z'),
      value: null
    },
    {
      date: new Date('2000-01-01T00:01:00.000Z'),
      value: 0.48716214
    },
    {
      date: new Date('2000-01-01T00:02:00.000Z'),
      value: null
    },
    {
      date: new Date('2000-01-01T00:03:00.000Z'),
      value: 0.41315788
    },
    {
      date: new Date('2000-01-01T00:04:00.000Z'),
      value: 0.43157892999999997
    },
    {
      date: new Date('2000-01-01T00:06:00.000Z'),
      value: null
    },
    {
      date: new Date('2000-01-01T00:07:00.000Z'),
      value: 0
    },
    {
      date: new Date('2000-01-01T00:10:00.000Z'),
      value: null
    }
  ],
  sensor: MockSourceData
}

export const MockSensorsAll = {
  rJywbfpZm: {
    id: 0,
    sourceDataType: '',
    sourceDataName: '',
    data: [
      {
        date: new Date('2000-01-01T00:00:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:01:00.000Z'),
        value: 0.48716214
      },
      {
        date: new Date('2000-01-01T00:02:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:03:00.000Z'),
        value: 0.41315788
      },
      {
        date: new Date('2000-01-01T00:04:00.000Z'),
        value: 0.43157892999999997
      },
      {
        date: new Date('2000-01-01T00:06:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:07:00.000Z'),
        value: 0
      },
      {
        date: new Date('2000-01-01T00:10:00.000Z'),
        value: null
      }
    ]
  },
  rJywbfpZmkl: {
    id: 1,
    sourceDataType: '',
    sourceDataName: '',
    data: [
      {
        date: new Date('2000-01-01T00:00:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:01:00.000Z'),
        value: 0.48716214
      },
      {
        date: new Date('2000-01-01T00:02:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:03:00.000Z'),
        value: 0.41315788
      },
      {
        date: new Date('2000-01-01T00:04:00.000Z'),
        value: 0.43157892999999997
      },
      {
        date: new Date('2000-01-01T00:06:00.000Z'),
        value: null
      },
      {
        date: new Date('2000-01-01T00:07:00.000Z'),
        value: 0
      },
      {
        date: new Date('2000-01-01T00:10:00.000Z'),
        value: null
      }
    ]
  }
}
