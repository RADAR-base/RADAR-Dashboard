import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { ComplianceDataService } from '../../services/compliance-data.service'
import * as actions from './compliance-data.actions'

@Injectable()
export class ComplianceDataEffects {
  @Effect()
  getAll$ = this.actions$.pipe(
    ofType(actions.LOAD),
    map((action: actions.Load) => action.payload),
    switchMap(payload => {
      return this.complianceDataService
        .getAll(payload)
        .pipe(map((data: any) => new actions.LoadSuccess(data)))
    })
  )

  constructor(
    private actions$: Actions,
    private complianceDataService: ComplianceDataService
  ) {}
}
