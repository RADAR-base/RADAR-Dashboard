import { Component, Input } from '@angular/core';
import { Tile } from '../../models/tile';
import { TileType } from './tile.type';

@Component({
  selector: 'app-tile',
  template: `
    <div class="title font-small">{{tile.title}}</div>
    <div #container class="container">
      <app-chart-heart-rate *ngIf="tile.type === tileType.HR"></app-chart-heart-rate>
      <app-chart-empty *ngIf="tile.type === tileType.EMPTY"></app-chart-empty>
    </div>
  `,
  styleUrls: ['tile.component.scss']
})
export class TileComponent {

  @Input() tile: Tile;

  constructor(
    public tileType: TileType
  ) {
  }

}
