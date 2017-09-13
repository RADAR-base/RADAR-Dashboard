import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SourceTooltipItem } from '../../../shared/models/source-tooltip.model'
import { AppConfig } from '../../../shared/utils/config'

@Component({
  selector: 'app-tooltip',
  template: `
    <div
      *ngFor="let item of data"
      [style.width]="width + 'px'"
      [ngSwitch]="item.dataType"
    >
      <div class="item single" *ngSwitchCase="'single'">
        <span class="label">{{ item.label[language] }}:</span>
        <span class="value">{{ setValue(item.value) }}</span>
      </div>
      <div class="item multi" *ngSwitchCase="'multi'">
        <span class="label">{{ item.label[language] }}</span>
        <div *ngFor="let k of item.keys">
          <span class="key-label">{{ k.label[language] }}:</span>
          <span class="value">{{ setMultiValue(k.key, item.value) }}</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./source-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceTooltipComponent {
  @Input() data: SourceTooltipItem[]
  @Input() position: { x: number; y: number }

  width = 220
  language = AppConfig.language

  setValue(value) {
    return value || '—'
  }

  setMultiValue(key, value) {
    return (value && value[key]) || '—'
  }
}
