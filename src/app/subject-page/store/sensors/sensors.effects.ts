import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { SensorsService } from '../../services/sensors.service'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as sensorsActions from './sensors.actions'

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
        .catch(() => of(new sensorsActions.LoadFail()))
    })

  @Effect()
  getSensorsSuccess$ = this.actions$
    .ofType<sensorsActions.LoadSuccess>(sensorsActions.LOAD_SUCCESS)
    .map(_ => new sensorsDataActions.UpdateDates())

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService
  ) {}
}
