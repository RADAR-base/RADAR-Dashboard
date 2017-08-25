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
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent implements OnInit {
  language = AppConfig.language
  collapsed = []

  @Input() sources

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {}

  toggleSensor(sensorId) {
    this.store.dispatch(new sensorsAction.ToggleVisibility(sensorId))
  }

  toggleSource(sourceId) {
    const index = this.collapsed.indexOf(sourceId)

    index > -1 ? this.collapsed.splice(index, 1) : this.collapsed.push(sourceId)
  }

  isSourceOn(sourceId) {
    return this.collapsed.indexOf(sourceId) === -1
  }
}
