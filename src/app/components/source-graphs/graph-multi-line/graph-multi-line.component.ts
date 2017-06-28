import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../../shared/models/multi-time-series.model'
import { AppConfig } from '../../../shared/utils/config'
import { GraphBaseComponent } from '../graph-base/graph-base.component'

@Component({
  selector: 'app-graph-multi-line',
  template: `
    <p class="font-small">{{ sensor?.label[language] }}</p>
    <app-chart-base-multi-line
      [chartData]="data$ | async"></app-chart-base-multi-line>
  `,
  styleUrls: ['./graph-multi-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphMultiLineComponent extends GraphBaseComponent {

  sensor
  language

  data$: Observable<MultiTimeSeries>

  @Input() gradient = false

  getData () {
    this.data$ = this.service.getMultiValueData(
      this.sensor.type,
      this.subjectId,
      this.sensor.source,
      AppConfig.config.sensors[this.sensor.type].keys,
      this.timeHoles
    )
  }

}
