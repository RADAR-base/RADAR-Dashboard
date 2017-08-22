import { Component, Input } from '@angular/core'

import { TimeSeries } from '../../../shared/models/time-series.model'
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
  sensor
  language

  data: TimeSeries[]
  isLoaded = false

  // TODO: Replace with API getting last available datapoint
  endTime = 1497689980000
  startTime = new Date(this.endTime).setDate(
    new Date(this.endTime).getDate() - 1
  )

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
