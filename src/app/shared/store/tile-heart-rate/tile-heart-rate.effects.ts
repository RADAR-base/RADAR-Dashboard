import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { TimeSeries } from '../../models/time-series.model'
import * as hrAction from './tile-heart-rate.actions'
import { TileHeartRateService } from './tile-heart-rate.service'

@Injectable()
export class TileHeartRateEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(hrAction.Types.UPDATE)
    .switchMap(() => {
      return this.hrService.get()
        .map((data: TimeSeries[]) => new hrAction.UpdateSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private hrService: TileHeartRateService
  ) { }
}
