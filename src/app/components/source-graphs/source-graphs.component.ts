import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'

import { Source } from '../../shared/store/source/source.model'

@Component({
  selector: 'app-source-graphs',
  templateUrl: 'source-graphs.component.html',
  styleUrls: ['./source-graphs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceGraphsComponent implements OnInit {
  CHART_TYPE = {
    HEART_RATE: 'HEART_RATE',
    ACCELEROMETER: 'ACCELEROMETER',
    BATTERY: 'BATTERY',
    BLOOD_VOLUME_PULSE: 'BLOOD_VOLUME_PULSE',
    ELECTRODERMAL_ACTIVITY: 'ELECTRODERMAL_ACTIVITY',
    INTER_BEAT_INTERVAL: 'INTER_BEAT_INTERVAL',
    THERMOMETER: 'THERMOMETER'
  }

  @Input() sources: Source[]
  @Input() subjectId: string
  endTime: any
  startTime: any

  constructor() {}

  ngOnInit() {
    // TODO: Replace with API getting last available datapoint
    this.endTime = 1497689980000
    this.startTime = new Date(this.endTime).setDate(
      new Date(this.endTime).getDate() - 1
    )
  }
}
