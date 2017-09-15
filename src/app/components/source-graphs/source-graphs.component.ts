import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { SourceTooltipItem } from '../../shared/models/source-tooltip.model'
import { Sensor } from '../../shared/store/sensors/sensors.model'
import { Source } from '../../shared/store/source/source.model'
import * as fromRoot from '../../shared/store/'
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

  tooltipData$: Observable<SourceTooltipItem[]>
  tooltipX = 0
  tooltipY = 0
  tooltipShow = 0 // 0 hide | 1 show
  lineX = 0

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.tooltipData$ = this.store.select(fromRoot.getSensorsTooltipValues)
  }

  trackBySourceId(index: number, source: Source) {
    return source.id
  }

  trackBySensorId(index: number, sensor: Sensor) {
    return sensor.id
  }

  onMouseMove(event) {
    if (event.target.classList.value === 'tooltip-box') {
      // TODO: improve positioning on the right side so that it's not hidden
      this.tooltipX = event.x - this.tooltip.width / 2
      this.tooltipY = event.y
      this.tooltipShow = 1
      this.lineX = event.layerX + 8
    } else {
      this.tooltipShow = 0
    }
  }

  onMouseLeave(event) {
    this.tooltipShow = 0
  }
}
