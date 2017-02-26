import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Categorical } from '../../../components/dashboard-tile/models/categorical.model'
import * as questionnaireAction from './tile-questionnaire.actions'
import { TileQuestionnaireService } from './tile-questionnaire.service'

@Injectable()
export class TileQuestionnaireEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(questionnaireAction.Types.UPDATE)
    .switchMap(() => {
      return this.questionnaireService.get()
        .map((data: Categorical[]) => new questionnaireAction.UpdateSuccess(data))
    })

  constructor (
    private actions$: Actions,
    private questionnaireService: TileQuestionnaireService
  ) { }
}
