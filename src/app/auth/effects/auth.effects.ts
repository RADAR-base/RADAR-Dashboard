import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'

import { AuthActionTypes, AuthActions } from '../actions/auth.actions'

@Injectable()
export class AuthEffects {
  @Effect() getToken$ = this.actions$.ofType(AuthActionTypes.GetToken)

  constructor(private actions$: Actions) {}
}
