import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators'

import { Study } from '../../shared/models/study.model'
import * as fromRoot from '../../store'
import { StudiesService } from '../services/studies.service'
import * as actions from './studies.actions'
import * as fromStudies from './studies.reducer'

@Injectable()
export class StudiesEffects {
  @Effect()
  getAll$: Observable<Action> = this.actions$.pipe(
    ofType<actions.Load>(actions.LOAD),
    withLatestFrom(this.store.select(fromStudies.getStudies)),
    map(([, studies]) =>
      studies.length
        ? new actions.LoadSuccess(studies)
        : new actions.LoadFromApi()
    )
  )

  @Effect()
  getAllFromAPI$: Observable<Action> = this.actions$.pipe(
    ofType<actions.LoadFromApi>(actions.LOAD_FROM_API),
    exhaustMap(() => {
      return this.studiesService.getAll().pipe(
        map((data: Study[]) => new actions.LoadSuccess(data)),
        catchError(() => of(new actions.LoadFail()))
      )
    })
  )

  constructor(
    private actions$: Actions,
    private studiesService: StudiesService,
    private store: Store<fromRoot.State>
  ) {}
}
