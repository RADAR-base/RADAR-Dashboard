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

import * as fromRoot from '../../../store'
import { VolumeDataService } from '../../services/volume-data.service'
import * as fromSubject from '../'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as volumeDataActions from './volume-data.actions'

@Injectable()
export class VolumeDataEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(volumeDataActions.LOAD),
    withLatestFrom(
      this.store.select(fromRoot.getRouterParamsStudyName),
      this.store.select(fromRoot.getRouterParamsSubjectId),
      this.store.select(fromSubject.getVolumeDataDescriptiveStatistic),
      this.store.select(fromSubject.getSourcesEntities)
    ),
    switchMap(([, studyName, subjectId, descriptiveStatistic, sources]) =>
      this.volumeDataService
        .getData(studyName, subjectId, descriptiveStatistic, sources)
        .pipe(
          map(data => new volumeDataActions.LoadSuccess(data)),
          catchError(() => of(new volumeDataActions.LoadFail()))
        )
    )
  )

  @Effect({ dispatch: false })
  loadSuccess$ = this.actions$.pipe(
    ofType(volumeDataActions.LOAD_SUCCESS),
    withLatestFrom(
      this.store.select(fromSubject.getVolumeDataTimeFrame),
      this.store.select(fromSubject.getVolumeDataTimeInterval)
    ),
    mergeMap(([, timeFrame, timeInterval]) => {
      return [
        this.store.dispatch(new sensorsDataActions.SetTimeFrame(timeFrame)),
        this.store.dispatch(
          new sensorsDataActions.SetTimeInterval(timeInterval)
        )
      ]
    })
  )

  @Effect()
  updateDates$ = this.actions$.pipe(
    ofType(sensorsDataActions.SET_TIME_FRAME),
    map(([]) => new sensorsDataActions.UpdateDates())
  )

  constructor(
    private actions$: Actions,
    private volumeDataService: VolumeDataService,
    private store: Store<fromRoot.State>
  ) {}
}