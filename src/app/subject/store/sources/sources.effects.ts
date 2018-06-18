import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { SourcesService } from '../../services/sources.service'
import * as sensorsActions from '../sensors/sensors.actions'
import * as sourcesActions from './sources.actions'

@Injectable()
export class SourcesEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(sourcesActions.LOAD),
    map((action: sourcesActions.Load) => action.payload),
    switchMap(payload => {
      return this.sourceService.getAll(payload).pipe(
        map(d => new sourcesActions.LoadSuccess(d)),
        catchError(() => of(new sourcesActions.LoadFail()))
      )
    })
  )

  @Effect()
  getAllSuccess$ = this.actions$.pipe(
    ofType(sourcesActions.LOAD_SUCCESS),
    map((action: sourcesActions.LoadSuccess) => action.payload),
    map(payload => new sensorsActions.Load(payload))
  )

  constructor(
    private actions$: Actions,
    private sourceService: SourcesService
  ) {}
}
