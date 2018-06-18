import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store, select } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, first, map, switchMap } from 'rxjs/operators'

import { Study } from '../../../shared/models/study.model'
import * as fromRoot from '../../../store/index'
import { StudyService } from '../../services/study.service'
import * as fromStudy from '../index'
import * as actions from './study.actions'

@Injectable()
export class StudyEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(actions.LOAD),
    switchMap(() =>
      this.store.pipe(
        select(fromStudy.getStudyFromStudies),
        first()
      )
    ),
    map(
      study =>
        study ? new actions.LoadSuccess(study) : new actions.LoadFromApi()
    )
  )

  @Effect()
  loadFromApi$ = this.actions$.pipe(
    ofType(actions.LOAD_FROM_API),
    switchMap(() =>
      this.store.pipe(
        select(fromRoot.getRouterParamsStudyName),
        first()
      )
    ),
    switchMap(studyName => {
      return this.studyService.getById(studyName).pipe(
        map((study: Study) => new actions.LoadSuccess(study)),
        catchError(() => of(new actions.LoadFail()))
      )
    })
  )

  constructor(
    private actions$: Actions,
    private studyService: StudyService,
    private store: Store<fromRoot.State>
  ) {}
}
