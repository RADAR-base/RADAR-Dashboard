import '@ngrx/core/add/operator/select'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as fromRoot from '../../shared/store'
import * as gridAction from '../../shared/store/grid/grid.actions'
import { Config } from '../../shared/utils/config'
import { DashboardTile } from '../dashboard-tile/dashboard-tile.model'

@Component({
  selector: 'app-dashboard-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-progress-animation *ngIf="(loading$ | async) === true"></app-progress-animation>
    <md-grid-list *ngIf="(loading$ | async) === false"
      [cols]="gridCols" rowHeight="fit">
      <md-grid-tile *ngFor="let tile of tiles$ | async"
        [colspan]="tile.cols" [rowspan]="tile.rows">
        <app-dashboard-tile [tile]="tile"></app-dashboard-tile>
      </md-grid-tile>
    </md-grid-list>
  `,
  styleUrls: ['./dashboard-grid.component.scss']
})
export class DashboardGridComponent implements OnInit {
  tiles$: Observable<DashboardTile[]>
  loading$: Observable<boolean>
  gridCols = Config.GRID_COLS

  // TODO: update grid when MD adds responsive support
  // [https://github.com/angular/material2/blob/master/src/lib/grid-list/README.md]
  constructor (private store: Store<fromRoot.State>) {
    this.tiles$ = store.select(fromRoot.getGridTiles)
    this.loading$ = store.select(fromRoot.getGridLoading)
  }

  ngOnInit () {
    this.store.dispatch(new gridAction.Load())
  }
}
