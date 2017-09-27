import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromSubjectPage from '../'
import * as sensorsActions from './sensors.actions'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import { SensorsService } from '../../services/sensors.service'

@Injectable()
export class SensorsEffects {
  @Effect()
  getSensors$: Observable<Action> = this.actions$
    .ofType<sensorsActions.Load>(sensorsActions.LOAD)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sensorsService
        .addSensorSpecsToSources(payload)
        .map(d => new sensorsActions.LoadSuccess(d))
    })

  @Effect()
  getSensorsSuccess$ = this.actions$
    .ofType<sensorsActions.LoadSuccess>(sensorsActions.LOAD_SUCCESS)
    .map(_ => new sensorsDataActions.UpdateDates())

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private store: Store<fromSubjectPage.State>
  ) {}
}
