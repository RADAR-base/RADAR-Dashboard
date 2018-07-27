import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import { TimeFrame } from '../../../../shared/models/time.model'
import { timeFramesEqual } from '../../../../shared/utils/timeframes-equal'
import * as fromSubject from '../../../store'
import * as volumeDataActions from '../../../store/volume-data/volume-data.actions'

@Component({
  selector: 'app-source-volume-timeframe',
  template: ` <div class="background">
  <div *ngIf="timeFrame" class="text">
    <mat-form-field>
      <input matInput [matDatepicker]="start" [value]="timeFrame.startDateTime" (dateChange)="changeTimeFrame({startDateTime: $event.value, endDateTime: timeFrame.endDateTime})">
      <mat-datepicker-toggle matSuffix [for]="start"></mat-datepicker-toggle>
      <mat-datepicker #start></mat-datepicker>
    </mat-form-field>
    <hr>
    <mat-form-field>
      <input matInput [matDatepicker]="end" [value]="timeFrame.endDateTime" (dateChange)="changeTimeFrame({startDateTime: timeFrame.startDateTime, endDateTime: $event.value})">
      <mat-datepicker-toggle matSuffix [for]="end"></mat-datepicker-toggle>
      <mat-datepicker #end></mat-datepicker>
    </mat-form-field>
  </div>
  </div>
  `,
  styleUrls: ['./source-volume-timeframe.component.scss']
})
export class SourceVolumeTimeFrameComponent {
  @Input() timeFrame

  constructor(private store: Store<fromSubject.State>) {}

  private changeTimeFrame(payload: TimeFrame) {
    if (!timeFramesEqual(payload, this.timeFrame)) {
      this.store.dispatch(new volumeDataActions.SetTimeFrame(payload))
    }
  }
}
