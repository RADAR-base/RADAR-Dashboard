import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'

import { Subject } from '../../../shared/models/subject.model'
import * as fromRoot from '../../../store/index'
import { SubjectService } from '../../services/subject.service'
import * as fromStudy from '../index'
import * as actions from './subjects.actions'

@Injectable()
export class SubjectsEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(actions.LOAD),
    withLatestFrom(
      this.store.select(fromStudy.getSubjects),
      this.store.select(fromRoot.getRouterParamsStudyName)
    ),
    map(([, subjects, studyName]) =>
      subjects.length && studyName === subjects[0].project.projectName
        ? new actions.LoadSuccess(subjects)
        : new actions.LoadFromApi()
    )
  )

  @Effect()
  loadFromApi$ = this.actions$.pipe(
    ofType(actions.LOAD_FROM_API),
    withLatestFrom(this.store.select(fromRoot.getRouterParamsStudyName)),
    switchMap(([, studyName]) => {
      return this.subjectService.getAll(studyName).pipe(
        map((subjects: Subject[]) => new actions.LoadSuccess(subjects)),
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
