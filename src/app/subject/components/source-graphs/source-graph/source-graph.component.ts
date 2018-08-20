import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

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
      [isSingle]="isSingle"
      [chartData]="sensorData"
      [keys]="keys"
      [hasGradient]="hasGradient"
      [hasTimeHoles]="hasTimeHoles"
      [hasYAxis]="true"
      [hasTooltip]="true"
      [margin]="graphMargins"
      [path]="path"
      (tooltipMouseMove)="onTooltipMouseMove($event)"
    >
    </app-chart-base-line>

    <app-chart-base-multi-line
      class="chart"
      *ngIf="sensorData && isLoaded && !(isSingle)"
      [isSingle]="isSingle"
      [chartData]="sensorData"
      [keys]="keys"
      [hasYAxis]="true"
      [hasTooltip]="true"
      [margin]="graphMargins"
      [path]="path"
      (tooltipMouseMove)="onTooltipMouseMove($event)"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnDestroy {
  @Input() isLoaded
  @Input() sensorId
  @Input() sensorData: ChartData
  @Input() sourceData: SourceData
  @Input() path

  graphMargins = { top: 32, right: 16, bottom: 32, left: 80 }

  get keys() {
    if (this.isSingle) {
      if (AppConfig.config.units[this.sourceData.unit]) {
        return [AppConfig.config.units[this.sourceData.unit].label.EN]
      }
    } else {
      return this.sourceData.keys.map(d =>
        Object.assign({}, d, {
          label: { EN: `${d.label.EN} (${this.sourceData.unit})` }
        })
      )
    }
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

  ngOnDestroy

  onTooltipMouseMove(date: Date) {
    this.store.dispatch(new sensorsDataActions.SetTooltipDate(date))
  }
}
