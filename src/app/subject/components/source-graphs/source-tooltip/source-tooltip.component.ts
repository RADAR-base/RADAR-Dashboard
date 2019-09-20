import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input
} from '@angular/core'

import { AppConfig } from '../../../../shared/app-config'
import { SourceTooltipItem } from '../../../../shared/models/source-tooltip.model'

@Component({
  selector: 'app-source-tooltip',
  template: `
    <div class="box mat-elevation-z6">
      <div class="date">{{ date | date: 'yyyy/MM/dd h:mm:ss a' }}</div>
      <div class="data">
        <div *ngFor="let item of data" [ngSwitch]="item.dataType">
          <div class="item single" *ngSwitchCase="'single'">
            <span class="label">{{ item.label[language] | shorten }}: </span>
            <span class="value">{{ setValue(item.value) }}</span>
          </div>
          <div class="item multi" *ngSwitchCase="'multi'">
            <span class="label">{{ item.label[language] | shorten }}</span>
            <div *ngFor="let k of item.keys">
              <span class="key-label">{{ k.label[language] }}: </span>
              <span class="value">{{ setMultiValue(k.key, item.value) }}</span>
            </div>
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
  @Input() date: Date
  @Input() position: { x: number; y: number }

  language = AppConfig.language
  width = 0
  center = 0

  get height(): number {
    return this.element.nativeElement.clientHeight
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.width = this.element.nativeElement.clientWidth
    this.center = this.width / 2
  }

  setValue(value) {
    return value || '—'
  }

  setMultiValue(key, value) {
    return (value && value[key]) || '—'
  }
}
