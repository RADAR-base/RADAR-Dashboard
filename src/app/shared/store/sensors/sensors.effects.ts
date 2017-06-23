import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsAction from './sensors.actions'
import { Sensor } from './sensors.model'
import { SensorsService } from './sensors.service'

@Injectable()
export class SensorsEffects {

  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(sensorsAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.sensorsService.getAll(payload)
        .map((data: Sensor[]) => new sensorsAction.GetAllSuccess(data))
    })
    .do(d => console.log('sensorsAction.GET_ALL', d))

  constructor (
    private actions$: Actions,
    private sensorsService: SensorsService
  ) {}
}
