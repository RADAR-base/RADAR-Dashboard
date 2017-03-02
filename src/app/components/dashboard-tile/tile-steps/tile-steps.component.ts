import '@ngrx/core/add/operator/select'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { TimeSeries } from '../../../shared/models/time-series.model'

import * as fromRoot from '../../../shared/store'
import { DescriptiveStatistic } from '../../../shared/store/config/config.model'
import * as stepsAction from '../../../shared/store/tile-steps/tile-steps.actions'

@Component({
  selector: 'app-tile-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
    </div>
    <div class="container">
      <app-chart-base-bar
        [chartData]="data$ | async"
        [categorical]="false"></app-chart-base-bar>
    </div>
  `,
  styleUrls: ['./tile-steps.component.scss']
})
export class TileStepsComponent implements OnInit {

  @Input() title: string

  data$: Observable<TimeSeries[]>
  stat$: Observable<DescriptiveStatistic[]>

  // TODO: plug it to the config
  selectedValue = 'avg'

  constructor (private store: Store<fromRoot.State>) {
    this.data$ = store.select(fromRoot.getChartStepsData)
      .filter(data => !!data)

    this.stat$ = store.select(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new stepsAction.Update('average'))
  }
}
