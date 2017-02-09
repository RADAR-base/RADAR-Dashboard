import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import * as acAction from './chart-acceleration.actions';
import { MultiTimeSeries } from '../../models/multi-time-series.model';
import { ChartAccelerationService } from '../../services/chart-acceleration.service';

@Injectable()
export class ChartAccelerationEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(acAction.Types.UPDATE)
    .switchMap(() => {
      return this.acService.get()
        .map((data: MultiTimeSeries[]) => new acAction.UpdateSuccess(data));
    });

  constructor(
    private actions$: Actions,
    private acService: ChartAccelerationService
  ) { }
}
