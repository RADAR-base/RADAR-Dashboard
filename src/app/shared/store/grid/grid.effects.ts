import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { DashboardTile } from '../../../components/dashboard-tile/dashboard-tile.model'
import * as gridAction from './grid.actions'
import { GridService } from './grid.service'

@Injectable()
export class GridEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(gridAction.Types.LOAD)
    .switchMap(() => {
      return this.gridService.get()
        .map((tiles: DashboardTile[]) => new gridAction.LoadSuccess(tiles))
    })

  constructor (
    private actions$: Actions,
    private gridService: GridService
  ) { }
}
