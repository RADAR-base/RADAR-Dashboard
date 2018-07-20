import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import * as fromSubject from '../../../store'
import * as volumeDataActions from '../../../store/volume-data/volume-data.actions'

@Component({
  selector: 'app-source-volume-timeframe',
  template: ` <div class="background">
  <div *ngIf="timeFrame" class="text">
    <mat-form-field>
      <input matInput [matDatepicker]="start" [value]="timeFrame.startDateTime" (dateChange)="changeStart($event.value)">
      <mat-datepicker-toggle matSuffix [for]="start"></mat-datepicker-toggle>
      <mat-datepicker #start></mat-datepicker>
    </mat-form-field>
    <hr>
    <mat-form-field>
      <input matInput [matDatepicker]="end" [value]="timeFrame.endDateTime" (dateChange)="changeEnd($event.value)">
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

  private changeStart(x) {
    this.store.dispatch(
      new volumeDataActions.SetTimeFrame({
        startDateTime: x.toISOString(),
        endDateTime: new Date(this.timeFrame.endDateTime).toISOString()
      })
    )
  }
  private changeEnd(x) {
    this.store.dispatch(
      new volumeDataActions.SetTimeFrame({
        startDateTime: new Date(this.timeFrame.startDateTime).toISOString(),
        endDateTime: x.toISOString()
      })
    )
  }
}
