import { ChartType } from '../../enums/chart-type.enum'
import { DataType } from '../../enums/data-type.enum'
import { SourceData } from '../../models/source-data.model'
import { Source } from '../../models/source.model'

export const MockSensorsOptions = {
  studyName: 'BioIT-Demo',
  subjectId: '3907dab9-b2ae-4db1-ba93-d5b3f699b1eb',
  timeFrame: { start: null, end: null },
  timeWindow: 'ONE_MIN',
  descriptiveStatistic: 3
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
  sourceId: 'b6f1a0bb-b663-4aa2-a776-3a51d4dc5f86',
  chart: { type: ChartType.line, dataType: DataType.single },
  label: { EN: 'Electrodermal Activity' },
  visible: true
}

export const MockSources: Source[] = [
  {
    sourceId: 'b6f1a0bb-b663-4aa2-a776-3a51d4dc5f86',
    sourceName: 'A003C9',
    sourceTypeId: 10855,
    sourceTypeProducer: 'EMPATICA',
    sourceTypeModel: 'E4',
    sourceTypeCatalogVersion: '1.0.0',
    assigned: true,
    status: 'DISCONNECTED',
    effectiveTimeFrame: {
      startDateTime: '2000-01-01T00:00:00Z',
      endDateTime: '2000-01-01T00:10:00Z'
    },
    sourceData: [MockSourceData]
  }
]

export const MockSensors = [MockSourceData]

export const MockSensorDataAPIResponse = {
  header: {
    subjectId: '3907dab9-b2ae-4db1-ba93-d5b3f699b1eb',
    sourceId: 'b6f1a0bb-b663-4aa2-a776-3a51d4dc5f86',
    projectId: 'BioIT-Demo',
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
