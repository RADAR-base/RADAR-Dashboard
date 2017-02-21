import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { AppConfig } from '../../shared/app.config'
import { Tile } from '../../models/tile.model'
import * as fromRoot from '../../store'
import * as gridAction from '../../store/grid/grid.actions'

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-ui-progress *ngIf="(loading$ | async) === true"></app-ui-progress>
    <md-grid-list *ngIf="(loading$ | async) === false"
      [cols]="gridCols" rowHeight="fit">
      <md-grid-tile *ngFor="let tile of tiles$ | async"
        [colspan]="tile.cols" [rowspan]="tile.rows">
        <app-chart-container [tile]="tile"></app-chart-container>
      </md-grid-tile>
    </md-grid-list>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tiles$: Observable<Tile[]>
  loading$: Observable<boolean>
  gridCols = AppConfig.GRID_COLS

  // TODO: update grid when MD adds responsive support
  // [https://github.com/angular/material2/blob/master/src/lib/grid-list/README.md]
  constructor (
    private store: Store<fromRoot.State>
  ) {
    this.tiles$ = this.store.let(fromRoot.getGridTiles)
    this.loading$ = this.store.let(fromRoot.getGridLoading)
  }

  ngOnInit () {
    this.store.dispatch(new gridAction.Load())
  }
}
