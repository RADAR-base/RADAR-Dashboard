import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-date-axis',
  template: `
    <div *ngIf="dates[0]" class="axis">
      <app-chart-date-axis [isDateAxis]="true" [dates]="dates"></app-chart-date-axis>
    </div>
  `,
  styleUrls: ['./source-date-axis.scss']
})
export class SourceDateAxisComponent {
  @Input() dates
}
