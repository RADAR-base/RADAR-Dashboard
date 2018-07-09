import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-volume-timeframe',
  template: ` <div class="background">
  <div *ngIf="timeFrame" class="text">
  {{ timeFrame.startDateTime | date: 'yyyy-MM-dd' }}<hr> 
  {{ timeFrame.endDateTime | date: 'yyyy-MM-dd' }}
  </div>
  </div>
  `,
  styleUrls: ['./source-volume-timeframe.component.scss']
})
export class SourceVolumeTimeFrameComponent {
  @Input() timeFrame
}
