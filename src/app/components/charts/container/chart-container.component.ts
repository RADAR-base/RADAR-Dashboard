import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Tile } from '../../../models/tile';
import { ChartType } from '../chart.type';

@Component({
  selector: 'app-chart-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-chart-heart-rate *ngIf="tile.type === chartType.HR" 
      [title]="tile.title"
      class="app-chart"></app-chart-heart-rate>
    <app-chart-empty *ngIf="tile.type === chartType.EMPTY"
      [title]="tile.title"
      class="app-chart"></app-chart-empty>
  `,
  styleUrls: ['chart-container.component.scss']
})
export class ChartContainerComponent {

  @Input() tile: Tile;

  constructor(public chartType: ChartType) {}

}
