import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TileComponent } from './tile.component'

const COMPONENTS = [TileComponent]

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class TileModule {}
