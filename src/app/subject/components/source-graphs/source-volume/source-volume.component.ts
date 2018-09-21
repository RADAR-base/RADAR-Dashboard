import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromSubject from '../../../store'
import * as sensorsDataActions from '../../../store/sensors-data/sensors-data.actions'

@Component({
  selector: 'app-source-volume',
  template: `
    <div class="background"></div>
    <app-chart-base-bar
      class="chart"
      *ngIf="data"
      [chartData]="data"
      [hasXAxis]="true"
      [hasBrush]="true"
      [categorical]="false"
      [path]="path"
      [margin]="{ top: 8, right: 36, bottom: 32, left: 63 }"
      [sensorDataTimeFrame]="sensorDataTimeFrame"
      (brushMove)="onBrushMove($event)"
    ></app-chart-base-bar>
  `,
  styleUrls: ['./source-volume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceVolumeComponent {
  @Input() data
  @Input() path
  sensorDataTimeFrame: any

  constructor(private store: Store<fromSubject.State>) {}

  onBrushMove(dates: Date[]) {
    this.sensorDataTimeFrame = dates
    this.store.dispatch(
      new sensorsDataActions.SetTimeFrame({
        startDateTime: dates[0],
        endDateTime: dates[1]
      })
    )
  }
}
