import { Component, OnInit } from '@angular/core';

import { Tile } from '../../models/tile';
import { DashboardTilesService } from '../../services/dashboard-tiles.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <md-grid-list cols="4" rowHeight="fit">
      <md-grid-tile *ngFor="let tile of tiles"
        [colspan]="tile.cols" [rowspan]="tile.rows">
        <app-dashboard-tile [tile]="tile"></app-dashboard-tile>
      </md-grid-tile>
    </md-grid-list>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tiles: Tile[];

  constructor(
    private dashboardService: DashboardTilesService
  ) { }

  ngOnInit() {
    this.tiles = this.dashboardService.getItems();
  }
}
