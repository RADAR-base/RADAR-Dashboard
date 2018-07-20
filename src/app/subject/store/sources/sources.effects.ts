import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

import * as fromRoot from '../../../store'
import { SourcesService } from '../../services/sources.service'
import * as sensorsDataActions from '../sensors-data/sensors-data.actions'
import * as sourceTypesActions from '../source-types/source-types.actions'
import * as volumeDataActions from '../volume-data/volume-data.actions'
import * as sourcesActions from './sources.actions'

@Injectable()
export class SourcesEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(sourcesActions.LOAD),
    withLatestFrom(
      this.store.select(fromRoot.getRouterParamsStudyName),
      this.store.select(fromRoot.getRouterParamsSubjectId)
    ),
    switchMap(([, studyName, subjectId]) =>
      this.sourceService.getAll(studyName, subjectId).pipe(
        map(source => new sourcesActions.LoadSuccess(source)),
        catchError(() => of(new sourcesActions.LoadFail()))
      )
    )
  )

  @Effect({ dispatch: false })
  injectSourceData$ = this.actions$.pipe(
    ofType(sourcesActions.INJECT_SOURCE_DATA),
    tap(() =>
      this.store.dispatch(
        new volumeDataActions.SetTimeFrame({
          startDateTime: null,
          endDateTime: null
        })
      )
    )
  )

  @Effect({ dispatch: false })
  getAllSuccess$ = this.actions$.pipe(
    ofType(sourcesActions.LOAD_SUCCESS),
    map((action: sourcesActions.LoadSuccess) => action.payload),
    tap(() => this.store.dispatch(new sourceTypesActions.Load()))
  )

  constructor(
    private actions$: Actions,
    private sourceService: SourcesService,
    private store: Store<fromRoot.State>
  ) {}
}
