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

  @Input() gradient = false

  getData() {
    this.service
      .getSingleValueData(
        this.sensor.type,
        this.subjectId,
        this.sensor.source,
        this.timeHoles
      )
      .subscribe(d => {
        this.data = d
        this.isLoaded = true

        this.changeDetectorRef.markForCheck()
      })
  }
}
