import { ChartGradientColors, ChartMargin } from '../models/chart.model';

export class AppConfig {
  // Grid Config
  static GRID_COLS = 4;

  // CHART Config
  static CHART_MARGIN: ChartMargin = {
    top: 16, right: 16, bottom: 32, left: 48
  };
  static CHART_GRADIENT_COLORS: ChartGradientColors[] = [
    { offset: '0%', color: '#2ED8E5' },
    { offset: '50%', color: '#F8E81C' },
    { offset: '100%', color: '#FF9100' },
  ];
  static CHART_GRADIENT_STOPS = {
    'y1': 60,
    'y2': 120,
  };
  static CHART_CATEGORICAL_COLORS = [
    '#add8e6',
    '#ffa500',
    '#ffc0cb',
    '#f0f8ff',
    '#deb887',
    '#d8bfd8'
  ];
}
