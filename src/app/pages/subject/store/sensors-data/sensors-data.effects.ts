import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromSubjectPage from '../'
import * as actions from './sensors-data.actions'
import { SensorsDataService } from '../../services/sensors-data.service'

@Injectable()
export class SensorsDataEffects {
  @Effect()
  updateDates$ = this.actions$
    .ofType<actions.UpdateDates>(actions.UPDATE_DATES)
    .withLatestFrom(this.store.select(fromSubjectPage.getSensors))
    .map(([, sensors]) => new actions.Load(sensors))

  @Effect()
  getSensorsDataSuccess$: Observable<Action> = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .map(action => action.payload)
    .withLatestFrom(
      this.store.select(fromSubjectPage.getSubjectId),
      this.store.select(fromSubjectPage.getSensorsTimeFrame),
      this.store.select(fromSubjectPage.getSensorsTimeInterval),
      this.store.select(fromSubjectPage.getSensorsDescriptiveStatistic)
    )
    .switchMap(
      ([sensors, subjectId, timeFrame, timeInterval, descriptiveStatistic]) =>
        this.sensorsDataService
          .getData(sensors, {
            subjectId,
            timeFrame,
            timeInterval,
            descriptiveStatistic
          })
          .map(data => new actions.LoadSuccess(data))
    )

  constructor(
    private actions$: Actions,
    private sensorsDataService: SensorsDataService,
    private store: Store<fromSubjectPage.State>
  ) {}
}
