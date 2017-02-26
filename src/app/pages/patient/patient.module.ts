import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { DashboardGridModule } from '../../components/dashboard-grid/dashboard-grid.module'
import { PatientPageComponent } from './patient.component'
import { PatientRoutingModule } from './patient.routing'

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    DashboardGridModule
  ],
  declarations: [
    PatientPageComponent
  ]
})
export class PatientModule {}
