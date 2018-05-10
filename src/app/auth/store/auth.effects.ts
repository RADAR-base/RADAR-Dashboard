import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'

import { AuthResponse, UserAuth } from '../models/auth'
import { AuthService } from '../services/auth.service'
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  SetToken
} from './auth.actions'

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(AuthActionTypes.Login)
    .pipe(
      map((action: Login) => action.payload),
      exhaustMap((auth: UserAuth) =>
        this.authService
          .login(auth)
          .pipe(
            tap(console.log),
            map(response => new LoginSuccess(response)),
            catchError(error => of(new LoginFailure(error)))
          )
      )
    )

  @Effect()
  loginSuccess$ = this.actions$
    .ofType(AuthActionTypes.LoginSuccess)
    .pipe(
      map((action: LoginSuccess) => action.payload),
      map((auth: AuthResponse) => new SetToken(auth))
    )

  constructor(private actions$: Actions, private authService: AuthService) {}
}
