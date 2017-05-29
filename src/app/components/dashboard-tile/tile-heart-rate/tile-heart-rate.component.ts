import '@ngrx/core/add/operator/select'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../../shared/models/time-series.model'
import { DescriptiveStatistic } from '../../../shared/store/config/config.model'
import * as fromRoot from '../../../shared/store'
import * as hrAction from '../../../shared/store/tile-heart-rate/tile-heart-rate.actions'

@Component({
  selector: 'app-tile-heart-rate',
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
      <app-chart-base-line
        [chartData]="data$ | async"
        [gradientEnabled]="true"></app-chart-base-line>
    </div>
  `,
  styleUrls: ['./tile-heart-rate.component.scss']
})
export class TileHeartRateComponent implements OnInit {

  @Input() title: string

  data$: Observable<TimeSeries[]>
  stat$: Observable<DescriptiveStatistic[]>

  // TODO: plug it to the config
  selectedValue = 'avg'

  constructor (private store: Store<fromRoot.State>) {
    this.data$ = store.select(fromRoot.getChartHRData)
      .filter(data => !!data)

    this.stat$ = store.select(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new hrAction.Update('average'))
  }
}
