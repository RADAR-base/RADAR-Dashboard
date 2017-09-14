export interface RadarAPISampleModel {
  header: {}
  dataset: RadarAPISingleSample[] | RadarAPIMultiSample[]
}

interface RadarAPISingleSample {
  startDateTime: string
  sample: {
    value: number
  }
}

interface RadarAPIMultiSample {
  startDateTime: string
  sample: {
    [key: string]: number
  }
}
