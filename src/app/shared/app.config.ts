import { ChartGradientColors, ChartMargin } from '../models/chart.model'

export class AppConfig {
  // Grid Config
  static GRID_COLS = 4

  // CHART Config
  static CHART_MARGIN: ChartMargin = {
    top: 16, right: 16, bottom: 32, left: 48
  }
  static CHART_GRADIENT_COLORS: ChartGradientColors[] = [
    { offset: '0%', color: '#2ED8E5' },
    { offset: '50%', color: '#F8E81C' },
    { offset: '100%', color: '#FF9100' }
  ]
  static CHART_GRADIENT_STOPS = {
    'y1': 60,
    'y2': 120
  }
  static CHART_CATEGORICAL_COLORS = [
    // Graph Colors as in 'common.scss'
    '#ffc',
    '#c7e9b4',
    '#7fcdbb',
    '#41b6c4',
    '#225ea8',
    '#0c2c84'

    // Alternative Colors
    // '#aae5f2',
    // '#b7f2ac',
    // '#f2ecac',
    // '#f2acac',
    // '#f2acf2',
    // '#b1acf2',
  ]
}
