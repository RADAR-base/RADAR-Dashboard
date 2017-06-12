import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as subjectAction from './subject.actions'
import { Subject } from './subject.model'
import { SubjectService } from './subject.service'

@Injectable()
export class StudyEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(subjectAction.LOAD)
    .switchMap(() => {
      return this.studyService.get()
        .map((data: Subject[]) => new subjectAction.LoadSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private studyService: SubjectService
  ) { }
}
