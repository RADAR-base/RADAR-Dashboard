import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../../../material'
import { ComplianceToggleComponent } from './compliance-toggle.component'

const COMPONENTS = [ComplianceToggleComponent]

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComplianceToggleModule {}
