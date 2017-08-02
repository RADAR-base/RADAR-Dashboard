import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Store } from '@ngrx/store'

import * as fromRoot from '../../../../shared/store/index'
import * as subjectTableAction from '../../../../shared/store/subject-table/subject-table.actions'

@Component({
  selector: 'app-device-status',
  template: `
    <td>{{ source.type }}</td>
    <td>
      <ng-container *ngIf="((data$ | async)[0])?.state; else loading; let state">
        <div [class.connected]="state==='CONNECTED'"
             [class.disconnected]="state==='DISCONNECTED'"></div>
        <ng-container *ngIf="source.type === 'ANDROID'"></ng-container>
        <ng-container *ngIf="source.type !== 'ANDROID'">{{ state }}</ng-container>
      </ng-container>
    </td>
  `,
  styleUrls: ['./device-status.component.scss']
})
export class DeviceStatusComponent implements OnInit {

  @Input () source
  @Input () subjectId
  payload: any
  data$: Observable<any>

  constructor (
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    this.payload = { subjectid: this.subjectId, sourceid: this.source.id, type: this.source.type}
    this.store.dispatch(new subjectTableAction.GetAll(this.payload))
    this.data$ = this.store.select(fromRoot.getSubjectTableAll)
        .publishReplay().refCount()
  }

}
