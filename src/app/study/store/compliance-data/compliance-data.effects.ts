import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

import { ComplianceDataService } from '../../services/compliance-data.service'
import * as actions from './compliance-data.actions'

@Injectable()
export class ComplianceDataEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(actions.LOAD),
    switchMap(payload => {
      return this.complianceDataService.getAll(payload).pipe(
        map((data: any) => new actions.LoadSuccess(data)),
        catchError(() => of(new actions.LoadFail()))
      )
    })
  )

  @Effect()
  setTimeFrameAndLoad$ = this.actions$.pipe(
    ofType(actions.SET_TIME_FRAME),
    map(payload => new actions.Load())
  )

  constructor(
    private actions$: Actions,
    private complianceDataService: ComplianceDataService
  ) {}
}
