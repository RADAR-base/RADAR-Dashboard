import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import * as userAction from '../actions/user';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(userAction.Types.LOAD)
    .switchMap(() => {
      return this.userService.getUser()
        .map((user: User) => new userAction.LoadSuccess(user));
    });
}
