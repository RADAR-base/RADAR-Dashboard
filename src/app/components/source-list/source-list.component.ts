import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'

import * as sensorsAction from '../../shared/store/sensors/sensors.actions'
import * as fromRoot from '../../shared/store/index'
import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-source-list',
  template: `
    <div *ngFor="let source of sources">
      <div (click)="toggleSource(source.id)"><p>
        <i class="material-icons" style="font-size:14px"
        [class.toggleOn]="isSourceVisible(source.id)">play_arrow</i> {{source.id}} | {{source.type}}
      </p></div>
      <div *ngIf="isSourceVisible(source.id)">
        <div *ngFor="let sensor of source.sensors">
          <div (click)="toggleSensor(sensor.id)"><p class="font-small">
            <i class="icon material-icons"
            [class.inactive]="!sensor.visible">remove_red_eye</i> {{sensor.label[language]}}
          </p></div>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent implements OnInit {
  @Input() sources
  sourceVisible: any

  language = AppConfig.language

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.sourceVisible = []
  }

  toggleSensor(sensorId) {
    this.store.dispatch(new sensorsAction.ToggleVisibility(sensorId))
  }

  toggleSource(sourceId) {
    this.sourceVisible.indexOf(sourceId) > -1
      ? this.sourceVisible.splice(this.sourceVisible.indexOf(sourceId), 1)
      : this.sourceVisible.push(sourceId)
  }

  isSourceVisible(sourceId) {
    return this.sourceVisible.indexOf(sourceId) > -1
  }
}
