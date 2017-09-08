import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { Sensor } from '../../shared/store/sensors/sensors.model'
import { Source } from '../../shared/store/source/source.model'

@Component({
  selector: 'app-source-graphs',
  templateUrl: 'source-graphs.component.html',
  styleUrls: ['./source-graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphsComponent implements OnInit {
  @Input() sources: Source[]
  @Input() isDataLoaded
  @Input() sensorsData
  @Input() labels
  @Input() dates

  constructor() {}

  ngOnInit() {}

  dispatchAction(event) {}

  trackBySourceId(index: number, source: Source) {
    return source.id
  }

  trackBySensorId(index: number, sensor: Sensor) {
    return sensor.id
  }
}
