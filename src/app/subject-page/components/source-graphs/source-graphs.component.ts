import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Sensor } from '../../../shared/models/sensor.model'
import { SourceTooltipItem } from '../../../shared/models/source-tooltip.model'
import { Source } from '../../../shared/models/source.model'
import * as fromSubjectPage from '../../store'
import { SourceTooltipComponent } from './source-tooltip/source-tooltip.component'

@Component({
  selector: 'app-source-graphs',
  templateUrl: 'source-graphs.component.html',
  styleUrls: ['./source-graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphsComponent implements OnInit {
  @ViewChild('tooltip') tooltip: SourceTooltipComponent

  @Input() sources: Source[]
  @Input() isDataLoaded
  @Input() sensorsData
  @Input() dates
  tooltipData$: Observable<SourceTooltipItem[]>
  tooltipX = 0
  tooltipY = 0
  tooltipShow = 0 // 0 hide | 1 show
  lineX = 0

  constructor(private store: Store<fromSubjectPage.State>) {}

  ngOnInit() {
    this.tooltipData$ = this.store.select(
      fromSubjectPage.getSensorsTooltipValues
    )
  }

  trackBySourceId(index: number, source: Source) {
    return source.id
  }

  trackBySensorId(index: number, sensor: Sensor) {
    return sensor.id
  }

  onMouseMove(event) {
    if (event.target.dataset.tooltipMouseBox) {
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
