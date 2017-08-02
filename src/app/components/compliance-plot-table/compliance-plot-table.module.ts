import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { CompliancePlotTableComponent } from './compliance-plot-table.component'
import { CompliancePlotTableService } from './compliance-plot-table.service'
import { ChartsModule } from '../charts/charts.module'
import { ComplianceService } from '../../shared/store/compliance/compliance.service'

@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [
    CompliancePlotTableComponent
  ],
  providers: [
    CompliancePlotTableService,
    ComplianceService
  ],
  exports: [CompliancePlotTableComponent]
})
export class CompliancePlotTableModule {}
