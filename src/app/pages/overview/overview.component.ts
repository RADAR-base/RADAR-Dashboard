import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'

@Component({
  selector: 'app-overview-page',
  template: `
    <div *ngFor="let study of (studies$ | async )">
      <button (click)="navigateToStudy(study.id)">{{ study.name }} - {{ study.id }}</button>
    </div>
  `,
  styleUrls: ['./overview.component.scss']
})
export class OverviewPageComponent implements OnInit {

  studies$: Observable<Study[]>

  constructor (
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.studies$ = store.select(fromRoot.getStudyAll)
  }

  ngOnInit () {
    this.store.dispatch(new studyAction.GetAll())
  }

  navigateToStudy (id) {
    this.store.dispatch(new studyAction.Select(id))
    this.router.navigate(['/study', id])
  }

}
