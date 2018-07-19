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

  constructor(
    private actions$: Actions,
    private volumeDataService: VolumeDataService,
    private store: Store<fromRoot.State>
  ) {}
}
