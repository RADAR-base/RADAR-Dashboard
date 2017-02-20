import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MultiTimeSeries } from '../../models/multi-time-series.model';
import * as fromRoot from '../../store';
import * as acAction from '../../store/chart-acceleration/chart-acceleration.actions';
import { DescriptiveStatistic } from '../../models/config.model';

@Component({
  selector: 'app-chart-acceleration',
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
  styleUrls: ['./chart-acceleration.component.scss']
})
export class ChartAccelerationComponent implements OnInit {

  @Input() title: string;

  data$: Observable<MultiTimeSeries[]>;
  stat$: Observable<DescriptiveStatistic[]>;

  // TODO: plug it to the config
  selectedValue = 'avg';

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartACData)
      .filter(data => !!data);

    this.stat$ = this.store.let(fromRoot.getConfigDescriptiveStatistic);
  }

  ngOnInit() {
    this.store.dispatch(new acAction.Update('average'));
  }
}
