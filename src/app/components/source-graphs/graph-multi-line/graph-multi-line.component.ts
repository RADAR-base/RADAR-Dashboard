import { Component, Input } from '@angular/core'

import { MultiTimeSeries } from '../../../shared/models/multi-time-series.model'
import { AppConfig } from '../../../shared/utils/config'
import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-multi-line',
  template: `
    <p class="font-small">{{ sensor?.label[language] }}</p>
    <div class="loading" *ngIf="!isLoaded">
      <p>Loading...</p>
    </div>
    <app-chart-base-multi-line *ngIf="data && isLoaded"
      [chartData]="data"></app-chart-base-multi-line>
    <div class="nodata" *ngIf="!(data) && isLoaded">
      <p>No data found for this timeframe.</p>
    </div>
  `,
  styleUrls: ['./graph-multi-line.component.scss']
})
export class GraphMultiLineComponent extends GraphBaseComponent {
  sensor
  language

  data: MultiTimeSeries
  isLoaded = false

  @Input() gradient = false

  getData() {
    this.service
      .getMultiValueDataWithDate(
        this.sensor.type,
        this.subjectId,
        this.sensor.source,
        AppConfig.config.sensors[this.sensor.type].keys,
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
