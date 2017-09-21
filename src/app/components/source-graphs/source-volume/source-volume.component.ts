import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-volume',
  template: `<div *ngIf="data">
      <app-chart-volume
      [chartData]="data"
      [hasYAxis]="false"
    ></app-chart-volume></div>
  `,
  styleUrls: ['./source-volume.component.scss']
})
export class SourceVolumeComponent {
  @Input() data
}
