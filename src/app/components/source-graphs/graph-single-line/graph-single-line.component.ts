import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-single-line',
  template: `
    <app-chart-base-line
      [chartData]="data$ | async"
      [gradientEnabled]="true"></app-chart-base-line>
  `,
  styleUrls: ['./graph-single-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphSingleLineComponent extends GraphBaseComponent {

  sensor
  language

  data$: Observable<TimeSeries[]>

  getData () {
    this.data$ = this.service.getSingleValueData(
      this.sensor.type,
      this.subjectId,
      this.sensor.source
    )
  }

}
