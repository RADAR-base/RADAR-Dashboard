import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import '@ngrx/core/add/operator/select'
import { Store } from '@ngrx/store'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/withLatestFrom'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store/index'
import * as studyAction from '../../shared/store/study/study.actions'
import { Study } from '../../shared/store/study/study.model'

@Component({
  selector: 'app-study-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Study Page</p>

    <p *ngIf="!(isLoaded$ | async)">Loading...</p>
    <p *ngIf="isLoadedAndValid$ | async">{{ study$ | async | json}}</p>
    <p *ngIf="!(isLoadedAndValid$ | async) && (isLoaded$ | async)">Study with ID {{studyId}} not found.</p>
  `,
  styleUrls: ['./study.component.scss']
})
export class StudyPageComponent implements OnDestroy {

  study$: Observable<Study>
  isLoaded$: Observable<boolean>
  isLoadedAndValid$: Observable<boolean>
  studyId: string

  private route$: any

  constructor (
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    // Get `studyId` from route and then get Study by `studyId`
    this.route$ = route.params
      .subscribe(params => {
        this.studyId = params['studyId']
      })

    this.isLoadedAndValid$ = store.select(fromRoot.getStudyIsLoadedAndValid)
      .do(isLoadedAndValid => {
        if (!isLoadedAndValid) {
          this.store.dispatch(new studyAction.GetById(this.studyId))
        }
      })

    // check if study is loaded
    this.isLoaded$ = store.select(fromRoot.getStudyIsLoaded)

    // get selected study
    this.study$ = store.select(fromRoot.getStudySelected)
  }

  ngOnDestroy () {
    this.route$.unsubscribe()
  }

}
