export interface SampleDataModel {
  header: Header
  dataset: SingleSample[] | MultiSample[]
}

export interface SingleSample {
  startDateTime: string
  value: number
}

export interface MultiSample {
  startDateTime: string
  value: {
    [key: string]: number
  }
}

export interface Header {
  subjectId: string
  sourceId: string
  projectId: string
  sourceType: string
  sourceDataType: string
  descriptiveStatistic: string
  unit: string
  timeWindow: string
  effectiveTimeFrame: EffectiveTimeFrame
}

export interface EffectiveTimeFrame {
  startDateTime: string
  endDateTime: string
}
