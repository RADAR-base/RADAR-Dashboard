import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { ConfigKey } from '../../shared/models/config.model'
import { AppConfig } from '../../shared/utils/config'
import { ChartColors } from '../charts/chart.model'

@Component({
  selector: 'app-compliance-plot',
  template: `
    <div *ngIf="isComplianceLoaded && data && keys" class="chart">
      <app-chart-base-multi-bar
        [chartData]="data"
        [keys]="keys"
        [yTicks]="yTicks"
        [colors]="colors"
        [yScaleDomain]="yScaleDomain"
      ></app-chart-base-multi-bar>
    </div>
  `,
  styleUrls: ['./compliance-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePlotComponent implements OnInit {
  @Input() data
  @Input() isComplianceLoaded
  keys: ConfigKey[]
  yTicks = [0, 0.25, 0.5, 0.75, 1]
  colors = [ChartColors.c3, ChartColors.c4]
  yScaleDomain = [0, 1]

  ngOnInit() {
    this.keys = AppConfig.config && AppConfig.config.compliance.keys
  }
}
