import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators'

import * as fromRoot from '../../../store'
import { SourceTypesService } from '../../services/source-types.service'
import * as fromSubject from '../'
import * as fromSourcesActions from '../sources/sources.actions'
import {
  LoadFail,
  LoadFromApi,
  LoadFromApiSuccess,
  LoadSuccess,
  SourceTypeActionTypes
} from './source-types.actions'

@Injectable()
export class SourceTypesEffects {
  @Effect()
  load$ = this.actions$.pipe(
    ofType(SourceTypeActionTypes.Load),
    withLatestFrom(this.store.select(fromSubject.getSourceTypesIds)),
    map(
      ([, sourceTypesIds]) =>
        sourceTypesIds.length ? new LoadSuccess() : new LoadFromApi()
    )
  )

  @Effect()
  loadFromApi$ = this.actions$.pipe(
    ofType(SourceTypeActionTypes.LoadFromApi),
    exhaustMap(() =>
      this.sourceTypesService.getAll().pipe(
        map(sourceTypes => new LoadFromApiSuccess(sourceTypes)),
        catchError(() => of(new LoadFail()))
      )
    )
  )

  @Effect()
  loadSuccess$ = this.actions$.pipe(
    ofType(
      SourceTypeActionTypes.LoadSuccess,
      SourceTypeActionTypes.LoadFromApiSuccess
    ),
    withLatestFrom(this.store.select(fromSubject.getSourceTypesEntities)),
    map(
      ([, sourceTypesEntities]) =>
        new fromSourcesActions.InjectSourceData(sourceTypesEntities)
    )
  )

  constructor(
    private actions$: Actions,
    private sourceTypesService: SourceTypesService,
    private store: Store<fromRoot.State>
  ) {}
}
