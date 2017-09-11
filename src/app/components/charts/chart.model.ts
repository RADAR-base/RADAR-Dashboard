export interface ChartMargin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ChartGradientColors {
  offset: string
  color: string
}

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
