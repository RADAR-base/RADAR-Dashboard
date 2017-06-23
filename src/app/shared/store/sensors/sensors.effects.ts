import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Source } from '../source/source.model'
import * as sensorsAction from './sensors.actions'
import { SensorsService } from './sensors.service'

@Injectable()
export class SensorsEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(sensorsAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.sensorsService.getAll(payload)
        .map((res: Source[]) => new sensorsAction.GetAllSuccess(res))
    })

  constructor (
    private actions$: Actions,
    private sensorsService: SensorsService
  ) {}
}
