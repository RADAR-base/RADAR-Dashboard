import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-compliance-plot',
  template: `
    <div *ngIf="isComplianceLoaded && data" class="chart">
      <app-chart-base-multi-bar [chartData]="data"></app-chart-base-multi-bar>
    </div>
  `,
  styleUrls: ['./compliance-plot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePlotComponent {
  @Input() data
  @Input() isComplianceLoaded
}
