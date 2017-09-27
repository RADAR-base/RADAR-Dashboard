import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsActions from '../sensors/sensors.actions'
import * as sourcesActions from './sources.actions'
import { SourcesService } from '../../services/sources.service'

@Injectable()
export class SourcesEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<sourcesActions.Load>(sourcesActions.LOAD)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sourceService
        .getAll(payload)
        .map(d => new sourcesActions.LoadSuccess(d))
    })

  @Effect()
  getAllSuccess$: Observable<Action> = this.actions$
    .ofType<sourcesActions.LoadSuccess>(sourcesActions.LOAD_SUCCESS)
    .map(action => action.payload)
    .map(payload => new sensorsActions.Load(payload))

  constructor(
    private actions$: Actions,
    private sourceService: SourcesService
  ) {}
}
