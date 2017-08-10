import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdButtonModule, MdToolbarModule } from '@angular/material'

import { ToolbarComponent } from './toolbar.component'

@NgModule({
  imports: [CommonModule, MdToolbarModule, MdButtonModule],
  declarations: [ToolbarComponent],
  exports: [MdButtonModule, ToolbarComponent]
})
export class ToolbarModule {}
