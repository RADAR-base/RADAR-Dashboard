import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-toggles',
  template: `
    <app-source-toggle-resolution
      [selectedTimeInterval]="sensorsDataTimeInterval"
    >
    </app-source-toggle-resolution>
    <app-source-toggle-statistic></app-source-toggle-statistic>
  `,
  styleUrls: ['./source-toggles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceTogglesComponent {
  @Input() sensorsDataTimeInterval
}
