import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppConfig } from '../../../../shared/app-config'
import { getStatEnumValue } from '../../../../shared/enums/descriptive-statistic.enum'
import * as fromSubject from '../../../store'
import * as sensorsDataActions from '../../../store/sensors-data/sensors-data.actions'

@Component({
  selector: 'app-source-toggle-statistic',
  template: `
    <div class="toggle-stat">
      <mat-select [value]="statistics[selectedStatistic]?.label?.EN">
        <mat-option
          *ngFor="let stat of statisticKeys"
          (click)="onSelect(stat)"
          [value]="statistics[stat]?.label?.EN"
        >
          {{ statistics[stat]?.label?.EN }}
        </mat-option>
      </mat-select>
    </div>
  `,
  styleUrls: ['./source-toggle-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceToggleStatisticComponent {
  @Input() selectedStatistic = 'MEDIAN'
  statistics
  statisticKeys
  volumeTimeIntervalChanged$: Observable<boolean>

  constructor(private store: Store<fromSubject.State>) {
    this.statistics = AppConfig.config.stats
    this.statisticKeys = Object.keys(this.statistics)
  }

  onSelect(statistic) {
    this.selectedStatistic = statistic
    this.store.dispatch(
      new sensorsDataActions.SetDescriptiveStatistic(
        getStatEnumValue(statistic)
      )
    )
  }
}
