import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { Study } from '../../../shared/models/study.model'
import { StudyService } from '../../services/study.service'
import * as actions from './study.actions'

@Injectable()
export class StudyEffects {
  @Effect()
  getById$ = this.actions$.pipe(
    ofType(actions.LOAD_STUDY_BY_ID),
    map((action: actions.LoadStudyById) => action.payload),
    switchMap(payload => {
      return this.studyService.getById(payload).pipe(
        map((data: Study) => new actions.LoadStudyByIdSuccess(data)),
        catchError(() => of(new actions.LoadStudyByIdFail()))
      )
    })
  )

  constructor(private actions$: Actions, private studyService: StudyService) {}
}
