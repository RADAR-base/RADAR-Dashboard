import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Store } from '@ngrx/store'

import { AppConfig } from '../../../../shared/app-config'
import { DataType } from '../../../../shared/enums/data-type.enum'
import { ChartData } from '../../../../shared/models/chart-data.model'
import { SourceData } from '../../../../shared/models/source-data.model'
import * as fromSubject from '../../../store'
import * as sensorsDataActions from '../../../store/sensors-data/sensors-data.actions'

@Component({
  selector: 'app-source-graph',
  template: `
    <div class="label">{{ label }}</div>

    <div class="loading" *ngIf="!isLoaded">
      <mat-spinner></mat-spinner>
    </div>
    
    <div class="nodata" *ngIf="!(sensorData) && isLoaded">
      <p class="emoji">🤷‍</p>
      <p>No data found.</p>
    </div>

    <app-chart-base-line
      class="chart"
      *ngIf="sensorData && isLoaded && isSingle"
      [chartData]="sensorData"
      [hasGradient]="hasGradient"
      [hasTimeHoles]="hasTimeHoles"
      [hasYAxis]="true"
      [hasTooltip]="true"
      [margin]="graphMargins"
      (tooltipMouseMove)="onTooltipMouseMove($event)"
    ></app-chart-base-line>

    <app-chart-base-multi-line
      class="chart"
      *ngIf="sensorData && isLoaded && !(isSingle)"
      [chartData]="sensorData"
      [keys]="keys"
      [hasYAxis]="true"
      [hasTooltip]="true"
      [margin]="graphMargins"
      (tooltipMouseMove)="onTooltipMouseMove($event)"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent {
  @Input() isLoaded
  @Input() sensorId
  @Input() sensorData: ChartData
  @Input() sourceData: SourceData

  graphMargins = { top: 32, right: 16, bottom: 32, left: 80 }

  get keys() {
    return this.sourceData.keys
  }

  get hasGradient() {
    return this.sourceData.chart.gradient
  }

  get hasTimeHoles() {
    return this.sourceData.chart.timeHoles
  }

  get isSingle() {
    return this.sourceData.chart.dataType === DataType.single
  }

  get label() {
    return this.sourceData.label && this.sourceData.label[AppConfig.language]
  }

  constructor(private store: Store<fromSubject.State>) {}

  onTooltipMouseMove(date: Date) {
    this.store.dispatch(new sensorsDataActions.SetTooltipDate(date))
  }
}
