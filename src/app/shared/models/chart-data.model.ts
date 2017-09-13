export interface ChartData {
  date: Date
  value: number | ChartMultiValueObject | null
}

export interface ChartMultiValueObject {
  [key: string]: number
}

export interface Categorical {
  name: string
  value: number | null
}
