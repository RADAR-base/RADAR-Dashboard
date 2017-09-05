import { Component, Input } from '@angular/core'

import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-single-line',
  template: `
<p class="font-small">{{ label[language] }}</p>
<div class="loading" *ngIf="!isLoaded">
<p>Loading...</p>
</div>
<app-chart-base-line *ngIf="data && isLoaded"
[chartData]="data" [dates]="dates"
[gradientEnabled]="gradient"></app-chart-base-line>
<div class="nodata" *ngIf="!(data) && isLoaded">
<p>No data found for this timeframe.</p>
</div>
`,
  styleUrls: ['./graph-single-line.component.scss']
})
export class GraphSingleLineComponent extends GraphBaseComponent {
  language
  @Input() gradient = false
}
