import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as studyAction from './study.actions'
import { Study } from './study.model'
import { StudyService } from './study.service'

@Injectable()
export class StudyEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(studyAction.GET_ALL)
    .switchMap(() => {
      return this.studyService.getAll()
        .map((data: Study[]) => new studyAction.GetAllSuccess(data))
    })

  @Effect()
  getById$: Observable<Action> = this.actions$
    .ofType(studyAction.GET_BY_ID)
    .map(toPayload)
    .switchMap(payload => {
      return this.studyService.getById(payload)
        .map((data: Study) => new studyAction.GetByIdSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private studyService: StudyService
  ) { }
}
