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
  getSensors$: Observable<Action> = this.actions$
    .ofType<actions.GetSensors>(actions.GET_SENSORS)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sensorsService
        .addSensorSpecsToSources(payload)
        .map(d => new actions.GetSensorsSuccess(d))
    })

  @Effect()
  getSensorsSuccess$ = this.actions$
    .ofType<actions.GetSensorsSuccess>(actions.GET_SENSORS_SUCCESS)
    .map(_ => new actions.UpdateDates())

  @Effect()
  updateDates$ = this.actions$
    .ofType<actions.UpdateDates>(actions.UPDATE_DATES)
    .withLatestFrom(this.store.select(fromRoot.getSensors))
    .concatMap(([_, sensors]) =>
      sensors.map(sensor => new actions.GetSensorsData(sensor))
    )

  @Effect()
  getSensorsDataSuccess$: Observable<Action> = this.actions$
    .ofType<actions.GetSensorsData>(actions.GET_SENSORS_DATA)
    .map(action => action.payload)
    .withLatestFrom(
      this.store.select(fromRoot.getSubjectSelectedId),
      this.store.select(fromRoot.getSensorsTimeFrame),
      this.store.select(fromRoot.getSensorsTimeInterval),
      this.store.select(fromRoot.getSensorsDescriptiveStatistic)
    )
    .mergeMap(
      ([sensor, subjectId, timeFrame, timeInterval, descriptiveStatistic]) =>
        this.sensorsService
          .getData(
            sensor,
            subjectId,
            timeFrame,
            timeInterval,
            descriptiveStatistic,
            AppConfig.config.sensors[sensor.type].dataType
          )
          .map(data => new actions.GetSensorsDataSuccess({ data, sensor }))
    )

  @Effect({ dispatch: false })
  destroy$ = this.actions$
    .ofType<actions.Destroy>(actions.DESTROY)
    .map(_ => this.sensorsService.terminateWorker())

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private store: Store<fromRoot.State>
  ) {}
}
