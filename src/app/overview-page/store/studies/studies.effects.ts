import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { Study } from '../../../shared/models/study.model'
import { StudiesService } from '../../services/studies.service'
import * as actions from './studies.actions'

@Injectable()
export class StudiesEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .switchMap(() => {
      return this.studiesService
        .getAll()
        .map((data: Study[]) => new actions.LoadSuccess(data))
        .catch(() => of(new actions.LoadFail()))
    })

  constructor(
    private actions$: Actions,
    private studiesService: StudiesService
  ) {}
}
