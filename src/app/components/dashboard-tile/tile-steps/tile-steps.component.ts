import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../../shared/store'
import * as stepsAction from '../../../shared/store/tile-steps/tile-steps.actions'
import { DescriptiveStatistic } from '../../../shared/store/config/config.model'
import { TimeSeries } from '../../../shared/models/time-series.model'

@Component({
  selector: 'app-tile-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
      <md-select #statSelect="ngModel" [(ngModel)]="selectedValue" class="item">
        <md-option *ngFor="let stat of stat$ | async" [value]="stat.value">
          {{ stat.label }}
        </md-option>
      </md-select>
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

  constructor (
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartStepsData)
      .filter(data => !!data)

    this.stat$ = this.store.let(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new stepsAction.Update('average'))
  }
}
