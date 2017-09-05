import { Component, Input } from '@angular/core'

import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-multi-line',
  template: `
    <p class="font-small">{{ label[language] }}</p>
    <div class="loading" *ngIf="!isLoaded">
      <p>Loading...</p>
    </div>
    <app-chart-base-multi-line *ngIf="data && isLoaded"
      [chartData]="data" [dates]="dates"></app-chart-base-multi-line>
    <div class="nodata" *ngIf="!(data) && isLoaded">
      <p>No data found for this timeframe.</p>
    </div>
  `,
  styleUrls: ['./graph-multi-line.component.scss']
})
export class GraphMultiLineComponent extends GraphBaseComponent {
  language
  @Input() gradient = false
}
