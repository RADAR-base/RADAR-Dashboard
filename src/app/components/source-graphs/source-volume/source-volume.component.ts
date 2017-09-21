import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-volume',
  template: `<app-chart-base-area *ngIf="data"[chartData]="data"[hasYAxis]="false">
  </app-chart-base-area>
  `,
  styleUrls: ['./source-volume.component.scss']
})
export class SourceVolumeComponent {
  @Input() data
}
