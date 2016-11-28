import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import * as hrAction from '../../actions/charts/heart-rate';
import { HeartRate } from '../../models/charts/heart-rate';
import { ChartHeartRateService } from '../../services/charts/heart-rate.service';

@Injectable()
export class ChartHeartRateEffects {

  constructor(
    private actions$: Actions,
    private hrService: ChartHeartRateService
  ) { }

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(hrAction.Types.UPDATE)
    .switchMap(() => {
      return this.hrService.getData()
        .map((data: HeartRate[]) => new hrAction.UpdateSuccess(data));
    });
}
