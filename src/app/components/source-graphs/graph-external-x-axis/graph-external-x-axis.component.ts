import { Component, Input } from '@angular/core'

import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-external-x-axis',
  template: `
    <div class="axis">
      <app-chart-external-x-axis *ngIf="data && isLoaded" [chartData]="data">
      </app-chart-external-x-axis>
    </div>
  `,
  styleUrls: ['./graph-external-x-axis.component.scss']
})
export class GraphExternalXAxisComponent extends GraphBaseComponent {
  language
  @Input() gradient = false
}
