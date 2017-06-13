import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as subjectAction from './subject.actions'
import { Subject } from './subject.model'
import { SubjectService } from './subject.service'

@Injectable()
export class SubjectEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(subjectAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.subjectService.getAll(payload)
        .map((data: Subject[]) => new subjectAction.GetAllSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}
}
