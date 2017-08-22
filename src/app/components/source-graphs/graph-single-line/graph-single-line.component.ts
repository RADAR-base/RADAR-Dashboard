import { Component, Input } from '@angular/core'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-single-line',
  template: `
    <p class="font-small">{{ sensor?.label[language] }}</p>
    <div class="loading" *ngIf="!isLoaded">
      <p>Loading...</p>
    </div>
    <app-chart-base-line *ngIf="data && isLoaded"
      [chartData]="data"
      [gradientEnabled]="gradient"></app-chart-base-line>
    <div class="nodata" *ngIf="!(data) && isLoaded">
      <p>No data found for this timeframe.</p>
    </div>
  `,
  styleUrls: ['./graph-single-line.component.scss']
})
export class GraphSingleLineComponent extends GraphBaseComponent {
  sensor
  language

  data: TimeSeries[]
  isLoaded = false

  @Input() gradient = false

  getData() {
    this.service
      .getSingleValueDataWithDate(
        this.sensor.type,
        this.subjectId,
        this.sensor.source,
        this.timeHoles,
        this.startTime,
        this.endTime
      )
      .subscribe(d => {
        this.data = d
        this.isLoaded = true

        this.changeDetectorRef.markForCheck()
      })
  }
}
