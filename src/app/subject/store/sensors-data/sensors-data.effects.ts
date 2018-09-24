import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import {
  catchError,
  debounceTime,
  map,
  mergeMap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators'

import { getTimeInterval } from '../../../shared/utils/get-time-interval'
import { timeFramesEqual } from '../../../shared/utils/timeframes-equal'
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

  @Effect({ dispatch: false })
  updateTimeInterval$ = this.actions$.pipe(
    ofType(actions.SET_TIME_FRAME),
    debounceTime(500),
    withLatestFrom(
      this.store.select(fromSubject.getSensorsDataTimeFrame),
      this.store.select(fromSubject.getSensorsDataPrevTimeFrame),
      this.store.select(fromSubject.getSensorsDataTimeInterval)
    ),
    map(([, timeFrame, prevTimeFrame, timeInterval]) => {
      return !timeFramesEqual(timeFrame, prevTimeFrame)
        ? this.store.dispatch(
            new actions.SetTimeInterval(
              timeInterval ? timeInterval : getTimeInterval(timeFrame)
            )
          )
        : this.store.dispatch(new actions.TimeFrameNoChange())
    })
  )

  @Effect({ dispatch: false })
  prepLoadSensorsData$ = this.actions$.pipe(
    ofType(actions.SET_TIME_INTERVAL),
    debounceTime(500),
    withLatestFrom(
      this.store.select(fromSubject.getSensorsDataTimeFrame),
      this.store.select(fromSubject.getSensorsDataPrevTimeFrame),
      this.store.select(fromSubject.getSensorsDataTimeInterval),
      this.store.select(fromSubject.getSensorsDataPrevTimeInterval)
    ),
    map(([, timeFrame, prevTimeFrame, timeInterval, prevTimeInterval]) => {
      !timeFramesEqual(timeFrame, prevTimeFrame) ||
      timeInterval !== prevTimeInterval
        ? this.store.dispatch(new actions.SetToLoading())
        : this.store.dispatch(new actions.TimeIntervalNoChange())
    })
  )

  @Effect()
  loadSensorsData$ = this.actions$.pipe(
    ofType(actions.SET_TO_LOADING),
    map(() => new actions.Load())
  )

  @Effect()
  changeDescriptiveStat$ = this.actions$.pipe(
    ofType(actions.SET_DESCRIPTIVE_STATISTIC),
    debounceTime(500),
    map(() => new actions.SetToLoading())
  )

  constructor(
    private actions$: Actions,
    private sensorsDataService: SensorsDataService,
    private store: Store<fromSubject.State>
  ) {}
}
