import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators'

import { getTimeInterval } from '../../../shared/utils/get-time-interval'
import * as fromRoot from '../../../store'
import { SensorsDataService } from '../../services/sensors-data.service'
import * as actions from './sensors-data.actions'
import * as fromSubject from '..'

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
      this.store.select(fromSubject.getSensorsDataDescriptiveStatistic),
      // TimeFrame through queryParams
      this.store.select(fromRoot.getRouterQueryParams)
    ),
    switchMap(
      ([
        _,
        sources,
        studyName,
        subjectId,
        timeFrame,
        timeWindow,
        descriptiveStatistic,
        queryParams
      ]) => {
        return this.sensorsDataService
          .getData(sources, {
            studyName,
            subjectId,
            timeFrame,
            timeWindow,
            descriptiveStatistic,
            queryParams
          })
          .pipe(
            map(data => new actions.LoadSuccess(data)),
            catchError(() => of(new actions.LoadFail()))
          )
      }
    )
  )

  @Effect()
  updateTimeInterval$ = this.actions$.pipe(
    ofType(actions.SET_TIME_FRAME),
    debounceTime(1000),
    withLatestFrom(
      this.store.select(fromSubject.getSensorsDataTimeFrame),
      this.store.select(fromSubject.getSensorsDataTimeInterval)
    ),
    map(
      ([, timeFrame, timeInterval]) =>
        new actions.SetTimeInterval(
          timeInterval ? timeInterval : getTimeInterval(timeFrame)
        )
    )
  )

  @Effect()
  loadSensorsData$ = this.actions$.pipe(
    ofType(actions.SET_TIME_INTERVAL),
    debounceTime(1000),
    map(([]) => new actions.Load())
  )

  constructor(
    private actions$: Actions,
    private sensorsDataService: SensorsDataService,
    private store: Store<fromSubject.State>
  ) {}
}
