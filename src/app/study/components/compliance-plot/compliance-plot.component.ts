import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { ChartColors } from '../../../shared/enums/chart-colors.enum'
import { ConfigKey } from '../../../shared/models/config.model'
import { AppConfig } from '../../../shared/utils/config'

@Component({
  selector: 'app-compliance-plot',
  template: `
    <app-chart-base-multi-bar
      *ngIf="isLoaded && data && keys"
      [chartData]="data"
      [keys]="keys"
      [yTicks]="yTicks"
      [colors]="colors"
      [hasYAxis]="true"
      [hasXAxis]="true"
      [yScaleDomain]="yScaleDomain"
    ></app-chart-base-multi-bar>
  `,
  styleUrls: ['./compliance-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePlotComponent implements OnInit {
  @Input() data
  @Input() isLoaded

  keys: ConfigKey[]
  yTicks = [0, 0.25, 0.5, 0.75, 1]
  colors = [ChartColors.c3, ChartColors.c4]
  yScaleDomain = [0, 1]

  ngOnInit() {
    this.keys = AppConfig.config && AppConfig.config.compliance.keys
  }
}
