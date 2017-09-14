import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../'
import * as actions from './sensors.actions'
import { SensorsService } from './sensors.service'

@Injectable()
export class SensorsEffects {
  @Effect()
  getSensors$: Observable<Action> = this.actions$
    .ofType<actions.GetSensors>(actions.LOAD_SENSORS)
    .map(action => action.payload)
    .switchMap(payload => {
      return this.sensorsService
        .addSensorSpecsToSources(payload)
        .map(d => new actions.GetSensorsSuccess(d))
    })

  @Effect()
  getSensorsSuccess$ = this.actions$
    .ofType<actions.GetSensorsSuccess>(actions.LOAD_SENSORS_SUCCESS)
    .map(_ => new actions.UpdateDates())

  @Effect()
  updateDates$ = this.actions$
    .ofType<actions.UpdateDates>(actions.UPDATE_DATES)
    .withLatestFrom(this.store.select(fromRoot.getSensors))
    .map(([, sensors]) => new actions.GetSensorsData(sensors))

  @Effect()
  getSensorsDataSuccess$: Observable<Action> = this.actions$
    .ofType<actions.GetSensorsData>(actions.LOAD_SENSORS_DATA)
    .map(action => action.payload)
    .withLatestFrom(
      this.store.select(fromRoot.getSubjectSelectedId),
      this.store.select(fromRoot.getSensorsTimeFrame),
      this.store.select(fromRoot.getSensorsTimeInterval),
      this.store.select(fromRoot.getSensorsDescriptiveStatistic)
    )
    .switchMap(
      ([sensors, subjectId, timeFrame, timeInterval, descriptiveStatistic]) =>
        this.sensorsService
          .getData(sensors, {
            subjectId,
            timeFrame,
            timeInterval,
            descriptiveStatistic
          })
          .map(data => new actions.GetSensorsDataSuccess(data))
    )

  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private store: Store<fromRoot.State>
  ) {}
}
