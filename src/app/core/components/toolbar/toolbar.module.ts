import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { MaterialModule } from '../../../material'
import { ToolbarComponent } from './toolbar.component'

const COMPONENTS = [ToolbarComponent]

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: COMPONENTS,
  exports: [...COMPONENTS]
})
export class ToolbarModule {}
