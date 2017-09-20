import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-date-axis',
  template: `
    <app-chart-date-axis
      *ngIf="dates[0]"
      [isDateAxis]="true"
      [chartData]="dates"
      [hasTooltip]="false"
      [margin]="{top: 0, right: 36, bottom: 0, left: 48 }"
    ></app-chart-date-axis>
  `,
  styleUrls: ['./source-date-axis.scss']
})
export class SourceDateAxisComponent {
  @Input() dates
}
