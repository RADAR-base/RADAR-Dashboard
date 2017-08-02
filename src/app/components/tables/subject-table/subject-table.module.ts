import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdTableModule, MdPaginatorModule } from '@angular/material'
import { MdePopoverModule } from '@material-extended/mde'
import { CdkTableModule } from '@angular/cdk'

import { SubjectTableComponent } from './subject-table.component'
import { DeviceStatusTooltipComponent } from '../device-status-tooltip/device-status-tooltip.component'
import { DeviceStatusComponent } from '../device-status-tooltip/device-status/device-status.component'
import { SubjectTableService } from '../../../shared/store/subject-table/subject-table.service'

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MdTableModule,
    MdPaginatorModule,
    MdePopoverModule
  ],
  declarations: [
    SubjectTableComponent,
    DeviceStatusTooltipComponent,
    DeviceStatusComponent
  ],
  providers: [
    SubjectTableService
  ],
  exports: [
    SubjectTableComponent
  ]
})
export class SubjectTableModule {}
