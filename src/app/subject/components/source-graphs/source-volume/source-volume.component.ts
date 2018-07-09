import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-volume',
  template: `
    <div class="background"></div>
    <app-chart-base-area
      class="chart"
      *ngIf="data"
      [chartData]="data"
      [hasXAxis]="true"
      [margin]="{ top: 8, right: 36, bottom: 32, left: 63 }"
    ></app-chart-base-area>
  `,
  styleUrls: ['./source-volume.component.scss']
})
export class SourceVolumeComponent {
  @Input() data
}
