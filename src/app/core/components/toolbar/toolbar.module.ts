import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule, MatToolbarModule } from '@angular/material'

import { ToolbarComponent } from './toolbar.component'

const COMPONENTS = [ToolbarComponent]

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  declarations: COMPONENTS,
  exports: [...COMPONENTS, MatButtonModule]
})
export class ToolbarModule {}
