import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import * as hrAction from './chart-heart-rate.actions';
import { HeartRate } from '../../models/chart-heart-rate.model';
import { ChartHeartRateService } from '../../services/chart-heart-rate.service';

@Injectable()
export class ChartHeartRateEffects {

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(hrAction.Types.UPDATE)
    .switchMap(() => {
      return this.hrService.get()
        .map((data: HeartRate[]) => new hrAction.UpdateSuccess(data));
    });

  constructor(
    private actions$: Actions,
    private hrService: ChartHeartRateService
  ) { }
}
