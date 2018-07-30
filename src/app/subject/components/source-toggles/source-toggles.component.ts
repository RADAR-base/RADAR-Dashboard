import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { AppConfig } from '../../../shared/app-config'
import * as fromSubject from '../../store'
import * as sensorsDataActions from '../../store/sensors-data/sensors-data.actions'
import * as volumeDataActions from '../../store/volume-data/volume-data.actions'

@Component({
  selector: 'app-source-toggles',
  template: `
  <app-source-toggle-resolution
  [selectedTimeInterval]="sensorsDataTimeInterval"
></app-source-toggle-resolution>
<app-source-toggle-statistic
></app-source-toggle-statistic>

  `,
  styleUrls: ['./source-toggles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceTogglesComponent {
  @Input() sensorsDataTimeInterval
}
