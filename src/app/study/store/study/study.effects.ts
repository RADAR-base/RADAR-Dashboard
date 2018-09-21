import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'

import { Study } from '../../../shared/models/study.model'
import * as fromRoot from '../../../store/index'
import { StudyService } from '../../services/study.service'
import * as complianceDataActions from '../compliance-data/compliance-data.actions'
import * as fromStudy from '../index'
import * as actions from './study.actions'

@Injectable()
export class StudyEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(actions.LOAD),
    withLatestFrom(this.store.select(fromStudy.getStudyFromStudies)),
    map(
      ([, study]) =>
        study ? new actions.LoadSuccess(study) : new actions.LoadFromApi()
    )
  )

  @Effect()
  loadFromApi$ = this.actions$.pipe(
    ofType(actions.LOAD_FROM_API),
    withLatestFrom(this.store.select(fromRoot.getRouterParamsStudyName)),
    switchMap(([, studyName]) => {
      return this.studyService.getById(studyName).pipe(
        map((study: Study) => new actions.LoadSuccess(study)),
        catchError(() => of(new actions.LoadFail()))
      )
    })
  )

  @Effect()
  loadComplianceData$ = this.actions$.pipe(
    ofType(actions.LOAD_SUCCESS),
    map(([]) => new complianceDataActions.Load())
  )

  constructor(
    private actions$: Actions,
    private studyService: StudyService,
    private store: Store<fromRoot.State>
  ) {}
}
