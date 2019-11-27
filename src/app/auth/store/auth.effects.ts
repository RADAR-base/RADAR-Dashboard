import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

import * as fromRoot from '../../store'
import { AuthService } from '../services/auth.service'
import {
  AuthActionTypes,
  LoginFailure,
  LoginSuccess,
  StoreAuth
} from './auth.actions'

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    withLatestFrom(this.store.select(fromRoot.getRouterQueryParams)),
    switchMap(([, params]) =>
      this.authService.login(params.code).pipe(
        map(authData => new LoginSuccess(authData)),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  )

  @Effect()
  rehydrateAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.RehydrateAuth),
    map(() => this.authService.getAuthData()),
    map(authData => new StoreAuth(authData))
  )

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => action.payload),
    tap(authData => this.authService.setAuthData(authData)),
    tap(() => this.router.navigate(['/']))
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(() => this.authService.clearAuthData()),
    tap(() => this.router.navigate(['/login']))
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    private store: Store<fromRoot.State>
  ) {}
}
