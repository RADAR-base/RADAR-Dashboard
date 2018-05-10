import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { map, take, tap } from 'rxjs/operators'

import * as AuthActions from '../store/auth.actions'
import * as fromAuth from '../store/auth.reducer'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.getIsLoggedIn).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.store.dispatch(new AuthActions.LoginRedirect())
          return false
        }

        return true
      }),
      take(1)
    )
  }
}
