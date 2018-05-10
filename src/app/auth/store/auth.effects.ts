import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
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
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((auth: UserAuth) =>
      this.authService
        .login(auth)
        .pipe(
          map(response => new LoginSuccess(response)),
          catchError(error => of(new LoginFailure(error)))
        )
    )
  )

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => action.payload),
    map((auth: AuthResponse) => new SetToken(auth)),
    tap(() => this.router.navigate(['/'])),
    tap(console.log)
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(() => this.router.navigate(['/login'])),
    tap(console.log)
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
