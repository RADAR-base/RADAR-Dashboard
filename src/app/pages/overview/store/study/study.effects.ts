import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Study } from '../../models/overview.model'
import { OverviewService } from '../../services/overview.service'
import * as actions from './study.actions'

@Injectable()
export class StudyEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.LoadStudies>(actions.LOAD_STUDIES)
    .switchMap(() => {
      return this.overviewService
        .getAll()
        .map((data: Study[]) => new actions.LoadStudiesSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private overviewService: OverviewService
  ) {}
}
