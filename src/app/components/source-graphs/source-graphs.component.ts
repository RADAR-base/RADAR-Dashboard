import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Source } from '../../shared/store/source/source.model'

@Component({
  selector: 'app-source-graphs',
  template: `
    <div *ngFor="let source of sources">
      <p>SOURCE {{ source.id }}</p>
      <div *ngFor="let sensor of source.sensors">
        <div [ngSwitch]="sensor.type">
          <app-graph-single-line *ngSwitchCase="CHART_TYPE.HEART_RATE"
            [sensor]="sensor" [subjectId]="subjectId"></app-graph-single-line>
          <p *ngSwitchDefault="" class="font-small">
            {{ sensor.type }} is not associated to any graph!</p>
        </div>
      </div>
    </div>
  `,
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

  constructor () { }

  ngOnInit () { }

}
