import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-compliance-plot',
  template: `
    <div *ngIf="isComplianceLoaded && data && keys" class="chart">
      <app-chart-base-multi-bar [chartData]="data" [keys]="keys" [yTicks]="yTicks"></app-chart-base-multi-bar>
    </div>
  `,
  styleUrls: ['./compliance-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePlotComponent implements OnInit {
  @Input() data
  @Input() isComplianceLoaded
  keys: any[]
  yTicks = [0, 0.25, 0.5, 0.75, 1]

  ngOnInit() {
    if (AppConfig.config) this.keys = AppConfig.config.compliance.keys
  }
}
