import '@ngrx/core/add/operator/select'
import 'rxjs/add/operator/withLatestFrom'
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'
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
    <p *ngIf="study$ | async">{{ study$ | async | json}}</p>
    <p *ngIf="isLoadedAndValid$ | async">Study with ID {{studyId}} not found.</p>
  `,
  styleUrls: ['./study.component.scss']
})
export class StudyPageComponent implements OnInit, OnDestroy {

  study$: Observable<Study>
  isLoaded$: Observable<boolean>
  isLoadedAndValid$: Observable<boolean>
  studyId: string

  private route$: any

  constructor (
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    this.route$ = route.params
      .do(console.log)
      .subscribe(params => this.studyId = params['studyId'])

    this.isLoadedAndValid$ = store.select(fromRoot.getStudyIsLoaded)
      .withLatestFrom(store.select(fromRoot.getStudyEntities))
      .map(([loaded, studies]) => loaded && !studies[this.studyId])

    this.isLoaded$ = store.select(fromRoot.getStudyIsLoaded)

    this.study$ = store.select(fromRoot.getStudyEntities)
      .withLatestFrom(store.select(fromRoot.getStudyIsLoaded))
      .do(([studies, loaded]) => {
        if (!loaded) {
          this.store.dispatch(new studyAction.Update())
          this.store.dispatch(new studyAction.Select(this.studyId))
        }
      })
      .map(([studies, loaded]) => studies[this.studyId])
  }

  ngOnInit () { }

  ngOnDestroy () {
    this.route$.unsubscribe()
  }

}
