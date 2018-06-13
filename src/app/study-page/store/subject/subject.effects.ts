import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { Subject } from '../../../shared/models/subject.model'
import { SubjectService } from '../../services/subject.service'
import * as actions from './subject.actions'

@Injectable()
export class SubjectEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(actions.LOAD),
    map((action: actions.Load) => action.payload),
    switchMap(payload => {
      return this.subjectService
        .getAll(payload)
        .pipe(map((data: Subject[]) => new actions.LoadSuccess(data)))
    })
  )

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}
}
