import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-graph-external-x-axis',
  template: `
    <div class="axis">
      <app-chart-external-x-axis *ngIf="data && isLoaded" [chartData]="data" [dates]="dates">
      </app-chart-external-x-axis>
    </div>
  `,
  styleUrls: ['./graph-external-x-axis.component.scss']
})
export class GraphExternalXAxisComponent {
  language
  @Input() gradient = false
  @Input() isLoaded
  @Input() data = []
  @Input() dates
  @Input() type
}
