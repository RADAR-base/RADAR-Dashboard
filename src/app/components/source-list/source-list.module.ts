import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdIconModule } from '@angular/material'

import { SourceListComponent } from './source-list.component'

@NgModule({
  imports: [CommonModule, MdIconModule],
  declarations: [SourceListComponent],
  exports: [SourceListComponent]
})
export class SourceListModule {}
