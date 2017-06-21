import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SourceGraphComponent } from './source-graph.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SourceGraphComponent
  ],
  exports: [
    SourceGraphComponent
  ]
})
export class SourceGraphModule {}
