import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsDataActions from '../../../subject-page/store/sensors-data/sensors-data.actions'
import * as sourcesActions from '../../../subject-page/store/sources/sources.actions'
import * as actions from './pages.actions'

@Injectable()
export class PagesEffects {
  @Effect()
  subjectDestroy$: Observable<Action> = this.actions$
    .ofType<actions.SubjectDestroy>(actions.SUBJECT_DESTROY)
    .mergeMap(() => [
      new sensorsDataActions.Destroy(),
      new sourcesActions.Destroy()
    ])

  constructor(private actions$: Actions) {}
}
