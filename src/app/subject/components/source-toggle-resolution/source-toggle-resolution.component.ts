import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import { AppConfig } from '../../../shared/app-config'
import * as fromSubject from '../../store'
import * as sensorsDataActions from '../../store/sensors-data/sensors-data.actions'
import * as volumeDataActions from '../../store/volume-data/volume-data.actions'

@Component({
  selector: 'app-source-toggle-resolution',
  template: `
  <div class="toggle-menu">
  <ng-container *ngFor="let timeInterval of timeIntervalKeys">
  <button mat-button [class.button-selected]="selectedTimeInterval == timeInterval" (click)="onSelect(timeInterval)">{{ timeIntervals[timeInterval]?.label?.EN }}</button>
  </ng-container>
  </div>
  `,
  styleUrls: ['./source-toggle-resolution.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceToggleResolutionComponent {
  @Input() selectedTimeInterval
  timeIntervals
  timeIntervalKeys
  selected

  constructor(private store: Store<fromSubject.State>) {
    this.timeIntervals = AppConfig.config.timeIntervals
    this.timeIntervalKeys = Object.keys(this.timeIntervals)
  }

  onSelect(interval) {
    this.selectedTimeInterval = interval
    this.store.dispatch(new sensorsDataActions.SetTimeInterval(interval))
    this.store.dispatch(new volumeDataActions.SetTimeInterval(interval))
  }
}
