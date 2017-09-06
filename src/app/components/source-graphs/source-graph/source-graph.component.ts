import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import * as tooltipAction from '../../../shared/store/sensors-tooltip/sensors-tooltip.actions'
import { DataTypes } from '../../../shared/store/sensors/sensors.model'
import * as fromRoot from '../../../shared/store/index'
import { AppConfig } from '../../../shared/utils/config'

@Component({
  selector: 'app-source-graph',
  template: `
    <div class="label">{{ label }}</div>

    <div class="loading" *ngIf="!isLoaded">
      <md-spinner></md-spinner>
    </div>
    <div class="nodata" *ngIf="!(data) && isLoaded">
      <p>No data found for this timeframe.</p>
    </div>

    <app-chart-base-line
      *ngIf="data && isLoaded && isSingle"
      [chartData]="data[sensorId]"
      [dates]="dates"
      [gradientEnabled]="gradientEnabled"
      [tooltipData]="tooltipData$| async"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-line>

    <app-chart-base-multi-line
      *ngIf="data && isLoaded && !(isSingle)"
      [chartData]="data[sensorId]"
      [dates]="dates"
      [tooltipData]="tooltipData$| async"
      (onMove)="onMoveHandler($event)"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnInit {
  @Input() isLoaded
  @Input() data = []
  @Input() dates
  @Input() type
  @Input() sensorId
  tooltipData$: Observable<any>

  get gradientEnabled() {
    return (
      AppConfig.config && AppConfig.config.sensors[this.type].chart.gradient
    )
  }

  get isSingle() {
    return (
      AppConfig.config &&
      AppConfig.config.sensors[this.type].dataType === DataTypes.single
    )
  }

  get label() {
    return (
      AppConfig.config &&
      AppConfig.config.sensors[this.type].label[AppConfig.language]
    )
  }

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.tooltipData$ = this.store
      .select(fromRoot.getSensorsTooltipAll)
      .publishReplay()
      .refCount()
  }
  onMoveHandler(event) {
    this.store.dispatch(new tooltipAction.GetAll(event))
  }
}
