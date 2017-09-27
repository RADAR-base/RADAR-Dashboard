import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { ComplianceService } from '../../services/compliance.service'
import * as actions from './compliance.actions'

@Injectable()
export class ComplianceEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.complianceService
        .getAll(payload)
        .map((data: any) => new actions.LoadSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private complianceService: ComplianceService
  ) {}
}
