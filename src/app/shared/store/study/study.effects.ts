import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as studyAction from './study.actions'
import { Study } from './study.model'
import { StudyService } from './study.service'

@Injectable()
export class StudyEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(studyAction.LOAD)
    .switchMap(() => {
      return this.studyService.get()
        .map((data: Study[]) => new studyAction.LoadSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private studyService: StudyService
  ) { }
}
