export interface ChartData {
  date: Date
  value: number | MultiValueObject
}

export interface MultiValueObject {
  [key: string]: number
}

export interface Categorical {
  name: string
  value: number
}
