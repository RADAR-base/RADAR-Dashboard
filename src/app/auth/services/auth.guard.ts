import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'

import * as AuthActions from '../store/auth.actions'
import * as fromAuth from '../store/auth.reducer'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    public jwtHelper: JwtHelperService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.getIsLoggedIn).pipe(
      map(isLoggedIn => {
        if (this.jwtHelper.isTokenExpired()) {
          this.store.dispatch(new AuthActions.LoginRedirect())
          return false
        }

        if (!isLoggedIn) {
          this.store.dispatch(new AuthActions.RehydrateAuth())
        }

        return true
      }),
      take(1)
    )
  }
}
