import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx'

import * as complianceAction from './compliance.actions'
import { ComplianceService } from './compliance.service'

@Injectable()
export class ComplianceEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(complianceAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.complianceService.getAll()
        .map((data: any) => new complianceAction.GetAllSuccess(data))
    })

  @Effect()
  getSelected$: Observable<Action> = this.actions$
    .ofType(complianceAction.GET_SELECTED)
    .map(toPayload)
    .switchMap(payload => {
      return this.complianceService.getSelected()
        .map((data: any) => new complianceAction.GetSelectedSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private complianceService: ComplianceService
  ) {}
}
