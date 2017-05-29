import '@ngrx/core/add/operator/select'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Categorical } from '../../../shared/models/categorical.model'

import * as fromRoot from '../../../shared/store'
import { DescriptiveStatistic } from '../../../shared/store/config/config.model'
import * as questionnaireAction from '../../../shared/store/tile-questionnaire/tile-questionnaire.actions'

@Component({
  selector: 'app-tile-questionnaire',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="header">
      <div class="title">{{title}}</div>
    </div>
    <div class="container">
      <app-chart-base-bar
        [chartData]="data$ | async"
        [categorical]="true"></app-chart-base-bar>
    </div>
  `,
  styleUrls: ['./tile-questionnaire.component.scss']
})
export class TileQuestionnaireComponent implements OnInit {

  @Input() title: string

  data$: Observable<Categorical[]>
  stat$: Observable<DescriptiveStatistic[]>

  // TODO: plug it to the config
  selectedValue = 'avg'

  constructor (private store: Store<fromRoot.State>) {
    this.data$ = store.select(fromRoot.getChartQuestionnaireData)
      .filter(data => !!data)

    this.stat$ = store.select(fromRoot.getConfigDescriptiveStatistic)
  }

  ngOnInit () {
    this.store.dispatch(new questionnaireAction.Update('average'))
  }
}
