import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators'

import { getTimeInterval } from '../../../shared/utils/get-time-interval'
import * as fromRoot from '../../../store'
import { VolumeDataService } from '../../services/volume-data.service'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as volumeDataActions from './volume-data.actions'
import * as fromSubject from '..'

@Injectable()
export class VolumeDataEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(volumeDataActions.LOAD),
    withLatestFrom(
      this.store.select(fromRoot.getRouterParamsStudyName),
      this.store.select(fromRoot.getRouterParamsSubjectId),
      this.store.select(fromSubject.getVolumeDataDescriptiveStatistic),
      this.store.select(fromSubject.getSourcesEntities),
      this.store.select(fromSubject.getVolumeDataTimeFrame),
      this.store.select(fromSubject.getVolumeDataTimeInterval)
    ),
    switchMap(
      ([
        ,
        studyName,
        subjectId,
        descriptiveStatistic,
        sources,
        timeFrame,
        timeWindow
      ]) =>
        this.volumeDataService
          .getData(sources, {
            studyName,
            subjectId,
            timeFrame,
            timeWindow,
            descriptiveStatistic
          })
          .pipe(
            map(data => new volumeDataActions.LoadSuccess(data)),
            catchError(() => of(new volumeDataActions.LoadFail()))
          )
    )
  )

  @Effect()
  updateTimeInterval$ = this.actions$.pipe(
    ofType(volumeDataActions.SET_TIME_FRAME),
    withLatestFrom(
      this.store.select(fromSubject.getVolumeDataTimeFrame),
      this.store.select(fromSubject.getSensorsDataTimeInterval)
    ),
    map(
      ([, timeFrame, timeInterval]) =>
        new volumeDataActions.SetTimeInterval(
          timeInterval ? timeInterval : getTimeInterval(timeFrame)
        )
    )
  )

  @Effect()
  loadSensorsData$ = this.actions$.pipe(
    ofType(volumeDataActions.SET_TIME_INTERVAL),
    map(([]) => new volumeDataActions.Load())
  )

  constructor(
    private actions$: Actions,
    private volumeDataService: VolumeDataService,
    private store: Store<fromRoot.State>
  ) {}
}
