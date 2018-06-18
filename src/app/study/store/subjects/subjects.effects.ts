import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store, select } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, first, map, switchMap } from 'rxjs/operators'

import { Subject } from '../../../shared/models/subject.model'
import * as fromRoot from '../../../store/index'
import { SubjectService } from '../../services/subject.service'
import * as actions from './subjects.actions'

@Injectable()
export class SubjectsEffects {
  // @Effect()
  // load$ = this.actions$.pipe(
  //   ofType(actions.LOAD),
  //   switchMap(() =>
  //     this.store.pipe(
  //       select(fromStudy.getStudyByRouteStudyName),
  //       first()
  //     )
  //   ),
  //   map(
  //     study =>
  //       study ? new actions.LoadSuccess(study) : new actions.LoadFromApi()
  //   )
  // )

  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(actions.LOAD),
    switchMap(() =>
      this.store.pipe(
        select(fromRoot.getRouterParamsStudyName),
        first()
      )
    ),
    switchMap(studyName => {
      return this.subjectService.getAll(studyName).pipe(
        map((data: Subject[]) => new actions.LoadSuccess(data)),
        catchError(() => of(new actions.LoadFail()))
      )
    })
  )

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService,
    private store: Store<fromRoot.State>
  ) {}
}
