import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as questionnaireAction from './chart-questionnaire.actions';
import { Categorical } from '../../models/categorical.model';
import { ChartQuestionnaireService } from '../../services/chart-questionnaire.service';

@Injectable()
export class ChartQuestionnaireEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(questionnaireAction.Types.UPDATE)
    .switchMap(() => {
      return this.questionnaireService.get()
        .map((data: Categorical[]) => new questionnaireAction.UpdateSuccess(data));
    });

  constructor(
    private actions$: Actions,
    private questionnaireService: ChartQuestionnaireService
  ) { }
}
