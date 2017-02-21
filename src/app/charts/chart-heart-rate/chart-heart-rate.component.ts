import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { TimeSeries } from '../../models/time-series.model'
import * as fromRoot from '../../store'
import * as hrAction from '../../store/chart-heart-rate/chart-heart-rate.actions'
import { DescriptiveStatistic } from '../../models/config.model'

@Component({
  selector: 'app-chart-heart-rate',
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
  styleUrls: ['./chart-heart-rate.component.scss']
})
export class ChartHeartRateComponent implements OnInit {

  @Input() title: string

  data$: Observable<TimeSeries[]>
  stat$: Observable<DescriptiveStatistic[]>

  // TODO: plug it to the config
  selectedValue = 'avg'

  constructor (
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartHRData)
      .filter(data => !!data)

    this.stat$ = this.store.let(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new hrAction.Update('average'))
  }
}
