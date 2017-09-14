import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from './compliance.actions'
import { ComplianceService } from './compliance.service'

@Injectable()
export class ComplianceEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.GetAll>(actions.GET_ALL)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.complianceService
        .getAll(payload)
        .map((data: any) => new actions.GetAllSuccess(data))
    })

  constructor(
    private actions$: Actions,
    private complianceService: ComplianceService
  ) {}
}
