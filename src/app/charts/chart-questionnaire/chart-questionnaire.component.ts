import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Categorical } from '../../models/categorical.model';
import * as fromRoot from '../../store';
import * as questionnaireAction from '../../store/chart-questionnaire/chart-questionnaire.actions';
import { DescriptiveStatistic } from '../../models/config.model';

@Component({
  selector: 'app-chart-questionnaire',
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
        [categorical]="true"></app-chart-base-bar>
    </div>
  `,
  styleUrls: ['./chart-questionnaire.component.scss']
})
export class ChartQuestionnaireComponent implements OnInit {

  @Input() title: string;

  data$: Observable<Categorical[]>;
  stat$: Observable<DescriptiveStatistic[]>;

  // TODO: plug it to the config
  selectedValue = 'avg';

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.data$ = this.store.let(fromRoot.getChartQuestionnaireData)
      .filter(data => !!data);

    this.stat$ = this.store.let(fromRoot.getConfigDescriptiveStatistic);
  }

  ngOnInit() {
    this.store.dispatch(new questionnaireAction.Update('average'));
  }
}
