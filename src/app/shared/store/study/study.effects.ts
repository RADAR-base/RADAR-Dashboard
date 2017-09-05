import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from './study.actions'
import { Study } from './study.model'
import { StudyService } from './study.service'

@Injectable()
export class StudyEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.GetAll>(actions.GET_ALL)
    .switchMap(() => {
      return this.studyService
        .getAll()
        .map((data: Study[]) => new actions.GetAllSuccess(data))
    })

  @Effect()
  getById$: Observable<Action> = this.actions$
    .ofType<actions.GetById>(actions.GET_BY_ID)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.studyService
        .getById(payload)
        .map((data: Study) => new actions.GetByIdSuccess(data))
    })

  constructor(private actions$: Actions, private studyService: StudyService) {}
}
