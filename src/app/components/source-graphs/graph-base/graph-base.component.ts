import { Component, Input } from '@angular/core'

import { Sensor } from '../../../shared/store/sensors/sensors.model'
import { AppConfig } from '../../../shared/utils/config'
import { SourceGraphsService } from '../source-graphs.service'

@Component({
  template: `<p>This should not be shown!</p>`
})
export class GraphBaseComponent {

  language = AppConfig.language

  @Input() subjectId
  @Input() timeHoles = true

  private _sensor: Sensor

  @Input()
  get sensor () {
    return this._sensor
  }

  set sensor (val) {
    if (val) {
      this._sensor = val
      this.getData()
    }
  }

  constructor (
    public service: SourceGraphsService
  ) {}

  getData () {
    // called when sensor is updated --> override
  }

}
