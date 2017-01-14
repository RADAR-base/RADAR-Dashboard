import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { GridService } from '../../services/grid.service';
import { Tile } from '../../models/tile.model';
import * as gridAction from './grid.actions';

@Injectable()
export class GridEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(gridAction.Types.LOAD)
    .switchMap(() => {
      return this.gridService.get()
        .map((tiles: Tile[]) => new gridAction.LoadSuccess(tiles));
    });

  constructor(
    private actions$: Actions,
    private gridService: GridService
  ) { }
}
