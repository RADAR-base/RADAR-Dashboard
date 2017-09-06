import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsActions from '../sensors/sensors.actions'
import * as sourceActions from './source.actions'
import { SourceService } from './source.service'

@Injectable()
export class SourceEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<sourceActions.GetAll>(sourceActions.GET_ALL)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sourceService
        .getAll(payload)
        .map(
          data =>
            new sourceActions.GetAllSuccess({ subjectId: payload, data: data })
        )
    })

  @Effect()
  getAllSuccess$: Observable<Action> = this.actions$
    .ofType<sourceActions.GetAllSuccess>(sourceActions.GET_ALL_SUCCESS)
    .map(action => action.payload)
    .map(payload => new sensorsActions.GetAll(payload))

  constructor(
    private actions$: Actions,
    private sourceService: SourceService
  ) {}
}
