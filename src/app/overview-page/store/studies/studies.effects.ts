import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map } from 'rxjs/operators'

import { Study } from '../../../shared/models/study.model'
import { StudiesService } from '../../services/studies.service'
import * as actions from './studies.actions'

@Injectable()
export class StudiesEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .pipe(
      exhaustMap(() => {
        return this.studiesService.getAll().pipe(
          map((data: Study[]) => new actions.LoadSuccess(data)),
          catchError(() => of(new actions.LoadFail()))
        )
      })
    )

  constructor(
    private actions$: Actions,
    private studiesService: StudiesService
  ) {}
}
