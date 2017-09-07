import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../../shared/store/index'
import { AppConfig } from '../../utils/config'
import * as actions from './sensors.actions'
import { SensorsService } from './sensors.service'

@Injectable()
export class SensorsEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$
    .ofType<actions.GetAll>(actions.GET_ALL)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sensorsService
        .addSpecsToSources(payload)
        .map(d => new actions.GetAllSuccess(d))
    })

  @Effect()
  getAllData$ = this.actions$
    .ofType<actions.GetAllSuccess>(actions.GET_ALL_SUCCESS)
    .map(action => action.payload)
    .withLatestFrom(this.store.select(fromRoot.getSensorsAll))
    .switchMap(([payload, sensors]) =>
      sensors.map(sensor => new actions.GetAllData(sensor))
    )

  @Effect()
  getAllDataSuccess$: Observable<Action> = this.actions$
    .ofType<actions.GetAllData>(actions.GET_ALL_DATA)
    .map(action => action.payload)
    .withLatestFrom(
      this.store.select(fromRoot.getSubjectSelectedId),
      this.store.select(fromRoot.getSensorsTimeFrame)
    )
    .mergeMap(([payload, subjectId, timeFrame]) =>
      this.sensorsService
        .getData(
          payload,
          subjectId,
          timeFrame,
          AppConfig.config.sensors[payload.type].dataType
        )
        .map(d => new actions.GetAllDataSuccess(d))
    )

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private store: Store<fromRoot.State>
  ) {}
}
