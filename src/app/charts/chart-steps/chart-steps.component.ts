import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { TimeSeries } from '../../models/time-series.model'
import * as fromRoot from '../../store'
import * as stepsAction from '../../store/chart-steps/chart-steps.actions'
import { DescriptiveStatistic } from '../../models/config.model'

@Component({
  selector: 'app-chart-steps',
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
  styleUrls: ['./chart-steps.component.scss']
})
export class ChartStepsComponent implements OnInit {

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
