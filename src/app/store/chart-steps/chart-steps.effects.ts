import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as stepsAction from './chart-steps.actions';
import { TimeSeries } from '../../models/time-series.model';
import { ChartStepsService } from '../../services/chart-steps.service';

@Injectable()
export class ChartStepsEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(stepsAction.Types.UPDATE)
    .switchMap(() => {
      return this.stepsService.get()
        .map((data: TimeSeries[]) => new stepsAction.UpdateSuccess(data));
    });

  constructor(
    private actions$: Actions,
    private stepsService: ChartStepsService
  ) { }
}
