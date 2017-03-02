import '@ngrx/core/add/operator/select'
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-study-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let study of (studies$ | async )">
      <button (click)="navigateToPatient(study.id)">{{ study.name }} - {{ study.id }}</button>
    </div>
  `,
  styleUrls: ['./study.component.scss']
})
export class StudyPageComponent implements AfterViewInit {
  studies$: Observable<Study[]>

  constructor (
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.studies$ = store.select(fromRoot.getStudyAll)
  }

  ngAfterViewInit () {
    this.store.dispatch(new studyAction.Update())
  }

  navigateToPatient (id) {
    this.router.navigate(['/patient', id])
  }
}
