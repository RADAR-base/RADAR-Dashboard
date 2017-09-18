import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input
} from '@angular/core'

import { SourceTooltipItem } from '../../../shared/models/source-tooltip.model'
import { AppConfig } from '../../../shared/utils/config'

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="box mat-elevation-z6">
      <div
        *ngFor="let item of data"
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
    </div>
  `,
  styleUrls: ['./source-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceTooltipComponent implements AfterViewInit {
  @Input() data: SourceTooltipItem[]
  @Input() position: { x: number; y: number }

  language = AppConfig.language
  width = 0
  mid = 0

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth
    this.mid = this.width / 2
  }

  setValue(value) {
    return value || '—'
  }

  setMultiValue(key, value) {
    return (value && value[key]) || '—'
  }
}
