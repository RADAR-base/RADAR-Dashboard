import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeartRate } from '../../../models/charts/heart-rate.model';
import * as fromRoot from '../../../reducers';
import * as hrAction from '../../../actions/charts/heart-rate';
import { DescriptiveStatistic } from '../../../models/config.model';

@Component({
  selector: 'app-chart-heart-rate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
      <!-- TODO: update to select average by default -->
      <md-select class="item">
        <md-option *ngFor="let stat of stat$ | async" [value]="stat.value">
          {{ stat.label }}
        </md-option>
      </md-select>
      <div class="item">
        <md-checkbox [checked]="true" align="end">
          Min & Max
        </md-checkbox>
      </div>
    </div>
    <div class="container">
      <app-chart-base-line 
        [chartData]="data$ | async"
        [margin]="{ top: 16, right: 16, bottom: 32, left: 48 }"
        [gradientEnabled]="true"></app-chart-base-line>
    </div>
  `,
  styleUrls: ['./chart-heart-rate.component.scss']
})
export class ChartHeartRateComponent implements OnInit {

  @Input() title: string;

  data$: Observable<HeartRate[]>;
  stat$: Observable<DescriptiveStatistic[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartHRData)
      .filter(data => !!data);

    this.stat$ = this.store.let(fromRoot.getConfigDescriptiveStatistic);
  }

  ngOnInit() {
    this.store.dispatch(new hrAction.Update('average'));
  }
}
