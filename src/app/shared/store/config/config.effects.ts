import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as actions from './config.actions'
import { Config } from './config.model'
import { ConfigService } from './config.service'

@Injectable()
export class ConfigEffects {
  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .switchMap(() => {
      return this.configService
        .get()
        .map((config: Config) => new actions.LoadSuccess(config))
    })

  constructor(
    private actions$: Actions,
    private configService: ConfigService
  ) {}
}
