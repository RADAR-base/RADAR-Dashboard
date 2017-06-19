import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'

@Component({
  selector: 'app-overview-page',
  template: `
    <div *ngFor="let study of (studies$ | async)">
      <button [routerLink]="['study', study.id]">{{ study.name }} - {{ study.id }}</button>
    </div>
  `,
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPageComponent implements OnInit {

  studies$: Observable<Study[]>

  constructor (
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit () {
    this.store.dispatch(new studyAction.GetAll())
    this.studies$ = this.store.select(fromRoot.getStudyAll)
  }

}
