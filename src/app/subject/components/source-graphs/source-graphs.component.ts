import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { ChartData } from '../../../shared/models/chart-data.model'
import { SourceData } from '../../../shared/models/source-data.model'
import { SourceTooltipItem } from '../../../shared/models/source-tooltip.model'
import { Source } from '../../../shared/models/source.model'
import { TimeFrame } from '../../../shared/models/time.model'
import * as fromSubject from '../../store'
import * as sensorsDataActions from '../../store/sensors-data/sensors-data.actions'
import * as volumeDataActions from '../../store/volume-data/volume-data.actions'
import { SourceTooltipComponent } from './source-tooltip/source-tooltip.component'

@Component({
  selector: 'app-source-graphs',
  templateUrl: 'source-graphs.component.html',
  styleUrls: ['./source-graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphsComponent implements OnInit, OnDestroy {
  @ViewChild('tooltip') tooltip: SourceTooltipComponent

  @Input() sources: Source[]
  @Input() isDataLoaded: boolean
  @Input() sensorsData: ChartData[]
  @Input() volumeData: ChartData[]
  @Input() isVolumeDataLoaded: boolean
  @Input() volumeTimeFrame: TimeFrame
  @Input() sensorsDataTimeFrame: number[]

  tooltipData$: Observable<SourceTooltipItem[]>
  tooltipDate$: Observable<Date>
  tooltipX = 0
  tooltipY = 0
  tooltipShow = 0 // 0 hide | 1 show
  lineX = 0

  constructor(private store: Store<fromSubject.State>) {}

  ngOnInit() {
    this.tooltipData$ = this.store.select(
      fromSubject.getSensorsDataTooltipValues
    )
    this.tooltipDate$ = this.store.select(fromSubject.getSensorsDataTooltipDate)
  }

  ngOnDestroy() {
    this.store.dispatch(new sensorsDataActions.Destroy())
    this.store.dispatch(new volumeDataActions.Destroy())
  }

  trackBySourceId(index: number, source: Source) {
    return source.sourceId
  }

  trackBySourceDataUid(index: number, sourceData: SourceData) {
    return sourceData.uid
  }

  onMouseMove(event) {
    if (event.target.getAttribute('data-tooltipMouseBox')) {
      this.tooltipX =
        event.clientX < document.body.clientWidth - this.tooltip.center
          ? event.clientX - this.tooltip.center
          : document.body.clientWidth - this.tooltip.width

      this.tooltipY =
        event.clientY < document.body.clientHeight - this.tooltip.height
          ? event.clientY
          : event.clientY - this.tooltip.height

      this.lineX = event.layerX
      this.tooltipShow = 1
    } else {
      this.tooltipShow = 0
    }
  }

  onMouseLeave(event) {
    this.tooltipShow = 0
  }
}
