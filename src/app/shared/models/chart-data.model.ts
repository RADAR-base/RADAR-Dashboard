export interface ChartData {
  date?: Date // TimeSeries Data
  name?: string // Categorical Data
  value: number | ChartMultiValueObject | null
}

export interface ChartMultiValueObject {
  [key: string]: number
}
