import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { TimeFrame } from '../../../../shared/models/time.model'

@Component({
  selector: 'app-source-date-axis',
  template: `
    <app-chart-date-axis
      *ngIf="timeFrame"
      [chartData]="[timeFrame.startDateTime, timeFrame.endDateTime]"
      [hasXAxis]="true"
      [margin]="{top: 0, right: 36, bottom: 0, left: 80 }"
    ></app-chart-date-axis>
  `,
  styleUrls: ['./source-date-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceDateAxisComponent {
  @Input() timeFrame: TimeFrame
}
