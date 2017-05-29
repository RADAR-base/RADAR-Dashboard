import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../models/time-series.model'
import * as stepsAction from './tile-steps.actions'
import { TileStepsService } from './tile-steps.service'

@Injectable()
export class TileStepsEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(stepsAction.Types.UPDATE)
    .switchMap(() => {
      return this.stepsService.get()
        .map((data: TimeSeries[]) => new stepsAction.UpdateSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private stepsService: TileStepsService
  ) { }
}
