import { ChartGradientColors } from '../../components/charts/chart.model'
import { Config } from '../models/config.model'

export class AppConfig {
  // TODO: move remote config and language to store (not constants)
  static language = 'EN'
  static config: Config

  static GRADIENT_COLORS: ChartGradientColors[] = [
    { offset: '0%', color: '#2ED8E5' },
    { offset: '50%', color: '#F8E81C' },
    { offset: '100%', color: '#FF9100' }
  ]
  static GRADIENT_STOPS = {
    y1: 60,
    y2: 120
  }
  static CHART_COLORS = {
    // ⚠️⚠️Graph Colors
    // ⚠️NOTE: Keep in sync with 'common.scss'!!
    c1: '#ffc',
    c2: '#c7e9b4',
    c3: '#7fcdbb',
    c4: '#41b6c4',
    c5: '#225ea8',
    c6: '#0c2c84',
    hover: '#fcaf0a'
  }
  static CATEGORICAL_COLORS = [
    AppConfig.CHART_COLORS.c1,
    AppConfig.CHART_COLORS.c2,
    AppConfig.CHART_COLORS.c3,
    AppConfig.CHART_COLORS.c4,
    AppConfig.CHART_COLORS.c5,
    AppConfig.CHART_COLORS.c6
  ]
}
