import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../../../material'
import { SourceToggleResolutionComponent } from './source-toggle-resolution/source-toggle-resolution.component'
import { SourceToggleStatisticComponent } from './source-toggle-statistic/source-toggle-statistic.component'
import { SourceTogglesComponent } from './source-toggles.component'

const COMPONENTS = [
  SourceTogglesComponent,
  SourceToggleResolutionComponent,
  SourceToggleStatisticComponent
]

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS]
})
export class SourceTogglesModule {}
