import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { mergeMap } from 'rxjs/operators'

import * as sensorsDataActions from '../../subject/store/sensors-data/sensors-data.actions'
import * as sourcesActions from '../../subject/store/sources/sources.actions'
import * as actions from './pages.actions'

@Injectable()
export class PagesEffects {
  @Effect()
  subjectDestroy$ = this.actions$.pipe(
    ofType(actions.SUBJECT_DESTROY),
    mergeMap(() => [
      new sourcesActions.Destroy(),
      new sensorsDataActions.Destroy()
    ])
  )

  constructor(private actions$: Actions) {}
}
