import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppConfig } from '../../../shared/app-config'
import * as fromSubject from '../../store'
import * as sensorsDataActions from '../../store/sensors-data/sensors-data.actions'
import * as volumeDataActions from '../../store/volume-data/volume-data.actions'

@Component({
  selector: 'app-source-toggle-resolution',
  template: `
  <div class="toggle-menu">
  <ng-container *ngFor="let timeInterval of timeIntervalKeys">
  </ng-container>
  </div>
  `,
  styleUrls: ['./source-toggle-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceToggleStatisticComponent {
  @Input() selectedTimeInterval
  timeIntervals
  timeIntervalKeys
  volumeTimeIntervalChanged$: Observable<boolean>

  constructor(private store: Store<fromSubject.State>) {
    this.timeIntervals = AppConfig.config.timeIntervals
    this.timeIntervalKeys = Object.keys(this.timeIntervals)
    this.timeIntervalKeys.pop()
  }

  onSelect(statistic) {}
}
