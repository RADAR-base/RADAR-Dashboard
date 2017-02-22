import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Tile } from '../../models/tile.model'

@Component({
  selector: 'app-chart-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-chart-heart-rate *ngIf="tile.type === CHART_TYPE.HR"
      [title]="title" class="app-chart"></app-chart-heart-rate>
    <app-chart-acceleration *ngIf="tile.type === CHART_TYPE.AC"
      [title]="title" class="app-chart"></app-chart-acceleration>
    <app-chart-steps *ngIf="tile.type === CHART_TYPE.STEPS"
      [title]="title" class="app-chart"></app-chart-steps>
    <app-chart-questionnaire *ngIf="tile.type === CHART_TYPE.QUEST"
      [title]="title" class="app-chart"></app-chart-questionnaire>
    <app-chart-empty *ngIf="tile.type === CHART_TYPE.EMPTY"
      [title]="title" class="app-chart"></app-chart-empty>
  `,
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent {

  CHART_TYPE = {
    HR: 'heart-rate',
    EMPTY: 'empty',
    AC: 'acceleration',
    STEPS: 'steps',
    QUEST: 'questionnaire'
  }

  @Input() tile: Tile

  get title () {
    return this.tile.title
  }
}
