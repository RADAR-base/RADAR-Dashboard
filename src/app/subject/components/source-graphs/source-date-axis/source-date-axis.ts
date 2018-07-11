import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-date-axis',
  template: `
    <app-chart-date-axis
      *ngIf="timeFrame.startDateTime"
      [timeFrame]="timeFrame"
      [hasXAxis]="true"
      [margin]="{top: 0, right: 36, bottom: 0, left: 80 }"
    ></app-chart-date-axis>
  `,
  styleUrls: ['./source-date-axis.scss']
})
export class SourceDateAxisComponent {
  @Input() timeFrame
}
