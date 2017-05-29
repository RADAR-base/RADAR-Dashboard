import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../../shared/store'
import * as acAction from '../../../shared/store/tile-acceleration/tile-acceleration.actions'
import { DescriptiveStatistic } from '../../../shared/store/config/config.model'
import { MultiTimeSeries } from '../../../shared/models/multi-time-series.model'

@Component({
  selector: 'app-tile-acceleration',
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
      <app-chart-base-multi-line
        [chartData]="data$ | async"></app-chart-base-multi-line>
    </div>
  `,
  styleUrls: ['./tile-acceleration.component.scss']
})
export class TileAccelerationComponent implements OnInit {

  @Input() title: string

  data$: Observable<MultiTimeSeries[]>
  stat$: Observable<DescriptiveStatistic[]>

  // TODO: plug it to the config
  selectedValue = 'avg'

  constructor (
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.select(fromRoot.getChartACData)
      .filter(data => !!data)

    this.stat$ = this.store.select(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new acAction.Update('average'))
  }
}
