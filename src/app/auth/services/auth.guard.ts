import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromAuth from '../reducers'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true
  }
}
