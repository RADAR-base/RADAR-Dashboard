import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, withLatestFrom } from 'rxjs/operators'

import { SensorsDataService } from '../../services/sensors-data.service'
import * as fromSubjectPage from '../'
import * as actions from './sensors-data.actions'

@Injectable()
export class SensorsDataEffects {
  @Effect()
  updateDates$ = this.actions$.pipe(
    ofType(actions.UPDATE_DATES),
    withLatestFrom(this.store.select(fromSubjectPage.getSensors)),
    map(([, sensors]) => new actions.Load(sensors))
  )

  @Effect()
  getSensorsDataSuccess$ = this.actions$
    .ofType<actions.Load>(actions.LOAD)
    .pipe(
      ofType(actions.LOAD),
      withLatestFrom(
        this.store.select(fromSubjectPage.getSubjectId),
        this.store.select(fromSubjectPage.getSensorsTimeFrame),
        this.store.select(fromSubjectPage.getSensorsTimeInterval),
        this.store.select(fromSubjectPage.getSensorsDescriptiveStatistic)
      ),
      switchMap(
        ([sensors, subjectId, timeFrame, timeInterval, descriptiveStatistic]) =>
          this.sensorsDataService
            .getData(sensors, {
              subjectId,
              timeFrame,
              timeInterval,
              descriptiveStatistic
            })
            .pipe(map(data => new actions.LoadSuccess(data)))
      )
    )

  constructor(
    private actions$: Actions,
    private sensorsDataService: SensorsDataService,
    private store: Store<fromSubjectPage.State>
  ) {}
}
