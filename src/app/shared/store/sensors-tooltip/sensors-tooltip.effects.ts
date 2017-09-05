import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../../shared/store/index'
import * as sensorsTooltipAction from './sensors-tooltip.actions'

@Injectable()
export class SensorsTooltipEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(sensorsTooltipAction.GET_ALL)
    .map(toPayload)
    .withLatestFrom(this.store$)
    .map(([payload, store]) => {
      return new sensorsTooltipAction.GetAllSuccess({
        date: payload,
        entities: store.sensors.entities,
        data: store.sensors.data
      })
    })

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>
  ) {}
}
