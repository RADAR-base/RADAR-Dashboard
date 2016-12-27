import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeartRate } from '../../../models/charts/heart-rate.model';
import * as fromRoot from '../../../reducers';
import * as hrAction from '../../../actions/charts/heart-rate';

@Component({
  selector: 'app-chart-heart-rate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
      <!-- TODO: Change select to MD2 when available -->
      <div class="item">
        <select name="statistic">
          <option value="average" selected>average</option>
          <option value="maximum">maximum</option>
          <option value="standard deviation">standard deviation</option>
          <option value="variance">variance</option>
          <option value="sum">sum</option>
          <option value="median">median</option>
          <option value="count">count</option>
          <option value="quartile deviation">quartile deviation</option>
          <option value="80th percentile">80th percentile</option>
          <option value="lower quartile">lower quartile</option>
          <option value="upper quartile">upper quartile</option>
        </select>
      </div>
      <div class="divider"></div>
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

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartHRData)
      .filter(data => !!data);
  }

  ngOnInit() {
    this.store.dispatch(new hrAction.Update('average'));
  }
}
