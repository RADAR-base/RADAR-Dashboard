import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-heart-rate',
  template: `
    <app-chart-base-line
      [chartData]="data$ | async"
      [gradientEnabled]="true"></app-chart-base-line>
  `,
  styleUrls: ['./graph-heart-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphHeartRateComponent extends GraphBaseComponent {

  sensor
  language

  data$: Observable<TimeSeries[]>

  getData () {
    this.data$ = this.service.getHRData(
      this.sensor.type,
      this.subjectId,
      this.sensor.source
    )
  }

}
