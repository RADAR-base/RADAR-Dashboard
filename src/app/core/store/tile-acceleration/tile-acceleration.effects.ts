import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { MultiTimeSeries } from '../../../components/dashboard-tile/models/multi-time-series.model'
import * as acAction from './tile-acceleration.actions'
import { TileAccelerationService } from './tile-acceleration.service'

@Injectable()
export class TileAccelerationEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(acAction.Types.UPDATE)
    .switchMap(() => {
      return this.acService.get()
        .map((data: MultiTimeSeries[]) => new acAction.UpdateSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private acService: TileAccelerationService
  ) { }
}
