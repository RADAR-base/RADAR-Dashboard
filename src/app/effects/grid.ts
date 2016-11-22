import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

import * as grid from '../actions/grid';
import { GridService } from '../services/grid.service';
import { ErrorLoggerService } from '../services/error-logger-service.service';

@Injectable()
export class GridEffects {

  constructor(
    private actions$: Actions,
    private gridService: GridService,
    private errorLogger: ErrorLoggerService
  ) { }

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(grid.ActionTypes.LOAD)
    .switchMap(() => {
      return this.gridService.getTiles()
        .map(tiles => new grid.LoadSuccessAction(tiles))
        .catch((error) => Observable.of(this.errorLogger.log(error)));
    });
}
