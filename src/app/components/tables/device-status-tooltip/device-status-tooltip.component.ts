import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-device-status-tooltip',
  template: `
  <mde-popover #appPopover="mdePopover">
    <table>
      <tr *ngFor="let source of sources">
        <app-device-status [subjectId]="subjectId" [source]="source">
        </app-device-status>
      </tr>
    </table>
  </mde-popover>
  <p [mdePopoverTriggerFor]="appPopover">Status</p>
  `,
  styleUrls: ['device-status-tooltip.component.scss']
})

export class DeviceStatusTooltipComponent implements OnInit {

  @Input() sources
  @Input () subjectId
  appPopover: any
  mdePopover: any

  ngOnInit () {}

}
