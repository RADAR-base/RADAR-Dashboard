import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-source-date',
  template: ` <div class="background">
  <div *ngIf="timeFrame" class="text">
  {{ timeFrame.startDateTime | date: 'yyyy-MM-dd' }}<hr> 
  {{ timeFrame.endDateTime | date: 'yyyy-MM-dd' }}
  </div>
  </div>
  `,
  styleUrls: ['./source-date.component.scss']
})
export class SourceDateComponent {
  @Input() timeFrame
}
