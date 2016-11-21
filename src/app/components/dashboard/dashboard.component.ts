import { Component, OnInit } from '@angular/core';

import { Tile } from '../../models/tile';
import { GridService } from '../../services/grid.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <md-grid-list cols="4" rowHeight="fit">
      <md-grid-tile *ngFor="let tile of tiles"
        [colspan]="tile.cols" [rowspan]="tile.rows">
        <app-tile [tile]="tile"></app-tile>
      </md-grid-tile>
    </md-grid-list>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tiles: Tile[];

  // TODO: update grid when MD adds responsive support
  // [https://github.com/angular/material2/blob/master/src/lib/grid-list/README.md]
  constructor(
    private gridService: GridService
  ) { }

  ngOnInit() {
    this.tiles = this.gridService.getItems();
  }
}
