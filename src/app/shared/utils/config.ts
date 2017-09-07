import { Config, ConfigCharts } from '../models/config.model'

export class AppConfig {
  // TODO: move remote config and language to store (not constants)
  static language = 'EN'
  static config: Config

  static charts: ConfigCharts = {
    MARGIN: {
      top: 16,
      right: 16,
      bottom: 32,
      left: 48
    },
    GRADIENT_COLORS: [
      { offset: '0%', color: '#2ED8E5' },
      { offset: '50%', color: '#F8E81C' },
      { offset: '100%', color: '#FF9100' }
    ],
    GRADIENT_STOPS: {
      y1: 60,
      y2: 120
    },
    CATEGORICAL_COLORS: [
      // Graph Colors as in 'common.scss'
      '#ffc',
      '#c7e9b4',
      '#7fcdbb',
      '#41b6c4',
      '#225ea8',
      '#0c2c84'
    ]
  }
}
