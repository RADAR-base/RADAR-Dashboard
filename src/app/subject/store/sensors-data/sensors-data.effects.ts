import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

import * as fromRoot from '../../../store'
import { SensorsDataService } from '../../services/sensors-data.service'
import * as fromSubject from '../'
import * as actions from './sensors-data.actions'

@Injectable()
export class SensorsDataEffects {
  @Effect()
  getSensorsDataSuccess$ = this.actions$.pipe(
    ofType<actions.Load>(actions.LOAD),
    withLatestFrom(
      // Sources
      this.store.select(fromSubject.getSources),
      // Router store values
      this.store.select(fromRoot.getRouterParamsStudyName),
      this.store.select(fromRoot.getRouterParamsSubjectId),
      // Store values
      this.store.select(fromSubject.getSensorsDataTimeFrame),
      this.store.select(fromSubject.getSensorsDataTimeInterval),
      this.store.select(fromSubject.getSensorsDataDescriptiveStatistic)
    ),
    switchMap(
      ([
        _,
        sources,
        studyName,
        subjectId,
        timeFrame,
        timeWindow,
        descriptiveStatistic
      ]) =>
        this.sensorsDataService
          .getData(sources, {
            studyName,
            subjectId,
            timeFrame,
            timeWindow,
            descriptiveStatistic
          })
          .pipe(map(data => new actions.LoadSuccess(data)))
    )
  )

  constructor(
    private actions$: Actions,
    private sensorsDataService: SensorsDataService,
    private store: Store<fromSubject.State>
  ) {}
}
