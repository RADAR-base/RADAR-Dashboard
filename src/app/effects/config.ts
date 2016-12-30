import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ConfigService } from '../services/config.service';
import { Config } from '../models/config.model';
import * as configAction from '../actions/config';

@Injectable()
export class ConfigEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(configAction.Types.LOAD)
    .switchMap(() => {
      return this.configService.get()
        .map((config: Config) => new configAction.LoadSuccess(config));
    });

  constructor(
    private actions$: Actions,
    private configService: ConfigService
  ) {}
}
