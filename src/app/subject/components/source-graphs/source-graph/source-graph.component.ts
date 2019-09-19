import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core'
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

    <div class="loading" *ngIf="!isLoaded || !isVolumeDataLoaded">
      <mat-spinner></mat-spinner>
    </div>

    <div class="nodata" *ngIf="(noDataError || serverError)">
      <p class="emoji">🤷‍</p>
      <p *ngIf="noDataError">No data found.</p>
      <p *ngIf="serverError">Maximum time windows exceeded.</p>
    </div>

    <app-chart-base-line
      class="chart"
      *ngIf="isLoaded && sensorData && isSingle"
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
      (tooltipMouseLeave)="onTooltipMouseLeave()"
    >
    </app-chart-base-line>

    <app-chart-base-multi-line
      class="chart"
      *ngIf="isLoaded && sensorData && isMulti"
      [isSingle]="isSingle"
      [chartData]="sensorData"
      [keys]="keys"
      [hasYAxis]="true"
      [hasTooltip]="true"
      [margin]="graphMargins"
      [path]="path"
      (tooltipMouseMove)="onTooltipMouseMove($event)"
      (tooltipMouseLeave)="onTooltipMouseLeave()"
    ></app-chart-base-multi-line>
  `,
  styleUrls: ['./source-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphComponent implements OnChanges {
  @Input() isLoaded
  @Input() sensorId
  @Input() sensorData: ChartData[] | string
  @Input() sourceData: SourceData
  @Input() path
  @Input() isVolumeDataLoaded
  @Output() tooltipMouseMoveParent = new EventEmitter<any>()
  @Output() tooltipMouseLeaveParent = new EventEmitter<any>()

  graphMargins = { top: 32, right: 16, bottom: 32, left: 80 }
  SERVER_ERROR = 'server_error'

  get keys() {
    if (this.sourceData.keys) {
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
  }

  get hasGradient() {
    return this.sourceData.chart.gradient
  }

  get hasTimeHoles() {
    return this.sourceData.chart.timeHoles
  }

  get isSingle() {
    if (this.sourceData.chart) {
      return this.sourceData.chart.dataType === DataType.single
    }
  }

  get isMulti() {
    if (this.sourceData.chart) {
      return this.sourceData.chart.dataType === DataType.multi
    }
  }

  get label() {
    return this.sourceData.label && this.sourceData.label[AppConfig.language]
  }

  get serverError() {
    return (
      this.sensorData === this.SERVER_ERROR &&
      this.isLoaded &&
      this.isVolumeDataLoaded
    )
  }

  get noDataError() {
    return !this.sensorData && this.isLoaded && this.isVolumeDataLoaded
  }

  ngOnChanges() {
    this.onTooltipMouseLeave()
  }

  constructor(private store: Store<fromSubject.State>) {}

  onTooltipMouseMove(data) {
    this.store.dispatch(new sensorsDataActions.SetTooltipDate(data.date))
    this.tooltipMouseMoveParent.emit(data.event)
  }

  onTooltipMouseLeave() {
    this.tooltipMouseLeaveParent.emit()
  }
}
