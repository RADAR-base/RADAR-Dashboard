import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { SensorsService } from '../../services/sensors.service'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as sensorsActions from './sensors.actions'

@Injectable()
export class SensorsEffects {
  @Effect()
  getSensors$ = this.actions$.pipe(
    ofType<sensorsActions.Load>(sensorsActions.LOAD),
    map(action => action.payload),
    switchMap(payload => {
      return this.sensorsService.addSensorSpecsToSources(payload).pipe(
        map(d => new sensorsActions.LoadSuccess(d)),
        catchError(() => of(new sensorsActions.LoadFail()))
      )
    })
  )

  @Effect()
  getSensorsSuccess$ = this.actions$.pipe(
    ofType<sensorsActions.LoadSuccess>(sensorsActions.LOAD_SUCCESS),
    map(_ => new sensorsDataActions.UpdateDates())
  )

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService
  ) {}
}
