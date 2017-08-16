import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ComplianceService } from '../../shared/store/compliance/compliance.service'
import { ChartsModule } from '../charts/charts.module'
import { CompliancePlotComponent } from './compliance-plot.component'

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [CompliancePlotComponent],
  providers: [ComplianceService],
  exports: [CompliancePlotComponent]
})
export class CompliancePlotModule {}
