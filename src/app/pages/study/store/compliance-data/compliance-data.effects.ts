import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { ComplianceDataService } from '../../services/compliance-data.service'
import * as actions from './compliance-data.actions'

@Injectable()
export class ComplianceDataEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.complianceDataService
        .getAll(payload)
        .map((data: any) => new actions.LoadSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private complianceDataService: ComplianceDataService
  ) {}
}
