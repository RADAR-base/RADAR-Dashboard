import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { Study } from '../../../shared/models/study.model'
import { StudyService } from '../../services/study.service'
import * as actions from './study.actions'

@Injectable()
export class StudyEffects {
  @Effect()
  getById$: Observable<Action> = this.actions$
    .ofType<actions.LoadStudyById>(actions.LOAD_STUDY_BY_ID)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.studyService
        .getById(payload)
        .map((data: Study) => new actions.LoadStudyByIdSuccess(data))
        .catch(() => of(new actions.LoadStudyByIdFail()))
    })

  constructor(private actions$: Actions, private studyService: StudyService) {}
}
