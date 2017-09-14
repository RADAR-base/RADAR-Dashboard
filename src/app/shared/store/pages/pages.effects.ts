import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as sensorsActions from '../sensors/sensors.actions'
import * as sourceActions from '../source/source.actions'
import * as actions from './pages.actions'

@Injectable()
export class PagesEffects {
  @Effect()
  subjectDestroy$: Observable<Action> = this.actions$
    .ofType<actions.SubjectDestroy>(actions.SUBJECT_DESTROY)
    .mergeMap(() => [new sensorsActions.Destroy(), new sourceActions.Destroy()])

  constructor(private actions$: Actions) {}
}
