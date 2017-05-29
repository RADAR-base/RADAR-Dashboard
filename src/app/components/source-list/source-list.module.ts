import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SourceListComponent } from './source-list.component'

@NgModule({
  imports: [CommonModule],
  declarations: [SourceListComponent],
  exports: [SourceListComponent]
})
export class SourceListModule {}
