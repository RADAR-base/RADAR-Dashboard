import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'

import * as tooltipAction from '../../../shared/store/sensors-tooltip/sensors-tooltip.actions'
import { DataType } from '../../../shared/store/sensors/sensors.model'
import * as fromRoot from '../../../shared/store/index'
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
      [dates]="dates"
      [gradientEnabled]="gradientEnabled"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-line>

    <app-chart-base-multi-line
      *ngIf="sensorData && isLoaded && !(isSingle)"
      [chartData]="sensorData"
      [dates]="dates"
      [keys]="keys"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnInit {
  @Input() isLoaded
  @Input() sensorData = []
  @Input() dates
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

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  onMoveHandler(event) {
    this.store.dispatch(new tooltipAction.GetAll(event))
  }
}
