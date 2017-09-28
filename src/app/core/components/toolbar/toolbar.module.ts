import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdButtonModule, MdToolbarModule } from '@angular/material'

import { ToolbarComponent } from './toolbar.component'

const COMPONENTS = [ToolbarComponent]

@NgModule({
  imports: [CommonModule, MdToolbarModule, MdButtonModule],
  declarations: COMPONENTS,
  exports: [...COMPONENTS, MdButtonModule]
})
export class ToolbarModule {}
