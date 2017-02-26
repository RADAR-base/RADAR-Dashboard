import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as userAction from './user.actions'
import { User } from './user.model'
import { UserService } from './user.service'

@Injectable()
export class UserEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(userAction.Types.LOAD)
    .switchMap(() => {
      return this.userService.get()
        .map((user: User) => new userAction.LoadSuccess(user))
    })

  constructor (
    private actions$: Actions,
    private userService: UserService
  ) { }
}
