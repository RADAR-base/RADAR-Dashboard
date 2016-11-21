import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../models/tile';
import { TileType } from '../../shared/tile-type.const';

@Component({
  selector: 'app-dashboard-tile',
  template: `
    <div class="title font-small">{{tile.title}}</div>
    <div class="content">
      <app-chart-heart-rate *ngIf="tile.type === tileType.HR"></app-chart-heart-rate>
      <app-chart-empty *ngIf="tile.type === tileType.EMPTY"></app-chart-empty>
    </div>
  `,
  styleUrls: ['dashboard-tile.component.scss']
})
export class DashboardTileComponent implements OnInit {
  @Input() tile: Tile;

  constructor(
    public tileType: TileType
  ) {
  }

  ngOnInit() {

  }

}
