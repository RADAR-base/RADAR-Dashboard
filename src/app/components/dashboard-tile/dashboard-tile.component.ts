import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { DashboardTile } from './dashboard-tile.model'

@Component({
  selector: 'app-dashboard-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-tile-heart-rate *ngIf="tile.type === CHART_TYPE.HR"
      [title]="title" class="app-tile"></app-tile-heart-rate>
    <app-tile-acceleration *ngIf="tile.type === CHART_TYPE.AC"
      [title]="title" class="app-tile"></app-tile-acceleration>
    <app-tile-steps *ngIf="tile.type === CHART_TYPE.STEPS"
      [title]="title" class="app-tile"></app-tile-steps>
    <app-tile-questionnaire *ngIf="tile.type === CHART_TYPE.QUEST"
      [title]="title" class="app-tile"></app-tile-questionnaire>
    <app-tile-empty *ngIf="tile.type === CHART_TYPE.EMPTY"
      [title]="title" class="app-tile"></app-tile-empty>
  `,
  styleUrls: ['./dashboard-tile.component.scss']
})
export class DashboardTileComponent {

  CHART_TYPE = {
    HR: 'heart-rate',
    EMPTY: 'empty',
    AC: 'acceleration',
    STEPS: 'steps',
    QUEST: 'questionnaire'
  }

  @Input() tile: DashboardTile

  get title () {
    return this.tile.title
  }
}
