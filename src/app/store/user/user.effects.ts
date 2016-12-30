import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import * as userAction from './user.actions';

@Injectable()
export class UserEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(userAction.Types.LOAD)
    .switchMap(() => {
      return this.userService.get()
        .map((user: User) => new userAction.LoadSuccess(user));
    });

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}
