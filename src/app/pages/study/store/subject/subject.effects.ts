import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Subject } from '../../models/study.model'
import { SubjectService } from '../../services/subject.service'
import * as actions from './subject.actions'

@Injectable()
export class SubjectEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.LoadSubjects>(actions.LOAD_SUBJECTS)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.subjectService
        .getAll(payload)
        .map((data: Subject[]) => new actions.LoadSubjectsSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private subjectService: SubjectService
  ) {}
}
