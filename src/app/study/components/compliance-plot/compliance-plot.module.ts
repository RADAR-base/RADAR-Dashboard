import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartsModule } from '../../../charts/charts.module'
import { CompliancePlotComponent } from './compliance-plot.component'

const COMPONENTS = [CompliancePlotComponent]

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CompliancePlotModule {}
