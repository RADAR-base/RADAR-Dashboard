import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from './subject.actions'
import { Subject } from './subject.model'
import { SubjectService } from './subject.service'

@Injectable()
export class SubjectEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.GetAll>(actions.GET_ALL)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.subjectService
        .getAll(payload)
        .map((data: Subject[]) => new actions.GetAllSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}
}
