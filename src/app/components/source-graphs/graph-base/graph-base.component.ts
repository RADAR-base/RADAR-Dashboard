import { Component, Input } from '@angular/core'

import { AppConfig } from '../../../shared/utils/config'

@Component({
  template: `<p>This should not be shown!</p>`
})
export class GraphBaseComponent {
  language = AppConfig.language

  @Input() data = []
  @Input() dates
  @Input() isLoaded
  @Input() label
}
