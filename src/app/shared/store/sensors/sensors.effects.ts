import { Injectable } from '@angular/core'
import { Actions, Effect, toPayload } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../../shared/store/index'
import * as sensorsAction from './sensors.actions'
import { SensorsService } from './sensors.service'

@Injectable()
export class SensorsEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType(sensorsAction.GET_ALL)
    .map(toPayload)
    .switchMap(payload => {
      return this.sensorsService.getAll(payload.data).map(
        res =>
          new sensorsAction.GetAllSuccess({
            subjectId: payload.subjectId,
            data: res
          })
      )
    })

  @Effect()
  getAllData$ = this.actions$
    .ofType(sensorsAction.GET_ALL_SUCCESS)
    .map(toPayload)
    .withLatestFrom(this.store$)
    .switchMap(([payload, store]) => {
      const entities = store.sensors.entities
      return Object.keys(entities).map(key => {
        return new sensorsAction.GetAllData({
          subjectId: payload.subjectId,
          data: entities[key]
        })
      })
    })

  @Effect()
  getAllDataSuccess$: Observable<Action> = this.actions$
    .ofType(sensorsAction.GET_ALL_DATA)
    .map(toPayload)
    .mergeMap(payload => {
      if (payload.data.type !== 'ACCELEROMETER') {
        return this.sensorsService.getDataSingle(payload).map(
          res =>
            new sensorsAction.GetAllDataSuccess({
              id: payload.data.id,
              data: res
            })
        )
      } else {
        return this.sensorsService.getDataMulti(payload).map(
          res =>
            new sensorsAction.GetAllDataSuccess({
              id: payload.data.id,
              data: res
            })
        )
      }
    })

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private store$: Store<fromRoot.State>
  ) {}
}
