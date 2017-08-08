import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { AppConfig } from '../../shared/utils/config'

@Component({
  selector: 'app-source-list',
  template: `
    <div *ngFor="let source of sources">
      <p>{{source.id}} | {{source.type}}</p>
      <div *ngFor="let sensor of source.sensors">
        <p class="font-small">{{sensor.label[language]}}</p>
      </div>
    </div>

  `,
  styleUrls: ['./source-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceListComponent {
  @Input() sources

  language = AppConfig.language
}
