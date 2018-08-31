import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'

import * as fromRoot from '../../../store'
import { ComplianceDataService } from '../../services/compliance-data.service'
import * as actions from './compliance-data.actions'
import * as fromStudy from '..'

@Injectable()
export class ComplianceDataEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(actions.LOAD),
    withLatestFrom(
      this.store.select(fromStudy.getStudy),
      this.store.select(fromStudy.getComplianceDataTimeFrame)
    ),
    switchMap(([, study, timeFrame]) =>
      this.complianceDataService.getAll(study, timeFrame).pipe(
        map((data: any) => new actions.LoadSuccess(data)),
        catchError(() => of(new actions.LoadFail()))
      )
    )
  )

  @Effect()
  setTimeFrameAndLoad$ = this.actions$.pipe(
    ofType(actions.SET_TIME_FRAME),
    map(payload => new actions.Load())
  )

  constructor(
    private actions$: Actions,
    private complianceDataService: ComplianceDataService,
    private store: Store<fromRoot.State>
  ) {}
}
