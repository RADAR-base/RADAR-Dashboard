import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import {
  catchError,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  tap
} from 'rxjs/operators'

import { Source } from '../../../shared/models/source.model'
import { SensorsService } from '../../services/sensors.service'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as sensorsActions from './sensors.actions'

@Injectable()
export class SensorsEffects {
  // @Effect({ dispatch: false })
  @Effect()
  getSensors$ = this.actions$.pipe(
    ofType<sensorsActions.Load>(sensorsActions.LOAD),
    map((action: sensorsActions.Load) => action.payload),
    tap(console.log),
    mergeMap((sources: Source[]) => sources),
    mergeMap((source: Source) => {
      console.log(source)
      return this.sensorsService.getSourceData(source).pipe(
        map(sourceData => new sensorsActions.UpdateSourceData(sourceData)),
        catchError(() => of(new sensorsActions.LoadFail()))
      )
    })

    // mergeMap((sources: Source[]) => {
    //   console.log('addSourceData', sources)
    //   return of(sources).pipe(
    //     tap(console.log),
    //     switchMap((source: Source) => {
    //       console.log(source)
    //       return this.sensorsService.getSourceData(source).pipe(
    //         map(sourceData => new sensorsActions.LoadSuccess(sourceData)),
    //         catchError(() => of(new sensorsActions.LoadFail()))
    //       )
    //     })
    //   )
    // })
  )

  // @Effect()
  // getSensorsSuccess$ = this.actions$.pipe(
  //   ofType<sensorsActions.LoadSuccess>(sensorsActions.LOAD_SUCCESS),
  //   map(() => new sensorsDataActions.UpdateDates())
  // )

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService
  ) {}
}
