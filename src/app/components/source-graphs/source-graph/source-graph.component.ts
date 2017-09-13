import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { DataType } from '../../../shared/store/sensors/sensors.model'
import { AppConfig } from '../../../shared/utils/config'

@Component({
  selector: 'app-source-graph',
  template: `
    <div class="label">{{ label }}</div>

    <div class="loading" *ngIf="!isLoaded">
      <md-spinner></md-spinner>
    </div>
    <div class="nodata" *ngIf="!(sensorData) && isLoaded">
      <p>No data found for this timeframe.</p>
    </div>

    <app-chart-base-line
      *ngIf="sensorData && isLoaded && isSingle"
      [chartData]="sensorData"
      [gradientEnabled]="gradientEnabled"
      [hasXAxis]="false"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-line>

    <app-chart-base-multi-line
      *ngIf="sensorData && isLoaded && !(isSingle)"
      [chartData]="sensorData"
      [keys]="keys"
      [hasXAxis]="false"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnInit {
  @Input() isLoaded
  @Input() sensorData = []
  @Input() type
  @Input() sensorId
  @Input() keys

  get gradientEnabled() {
    return (
      AppConfig.config && AppConfig.config.sensors[this.type].chart.gradient
    )
  }

  get isSingle() {
    return (
      AppConfig.config &&
      AppConfig.config.sensors[this.type].dataType === DataType.single
    )
  }

  get label() {
    return (
      AppConfig.config &&
      AppConfig.config.sensors[this.type].label[AppConfig.language]
    )
  }

  constructor() {}

  ngOnInit() {}

  onMoveHandler(event) {}
}
