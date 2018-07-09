import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartsModule } from '../../../charts/charts.module'
import { TileModule } from '../../../core/components/tile/tile.module'
import { MaterialModule } from '../../../material'
import { SourceDateAxisComponent } from './source-date-axis/source-date-axis'
import { SourceDateComponent } from './source-date/source-date.component'
import { SourceGraphComponent } from './source-graph/source-graph.component'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceTooltipComponent } from './source-tooltip/source-tooltip.component'
import { SourceVolumeComponent } from './source-volume/source-volume.component'

const COMPONENTS = [
  SourceGraphsComponent,
  SourceGraphComponent,
  SourceTooltipComponent,
  SourceDateAxisComponent,
  SourceVolumeComponent,
  SourceDateComponent
]

@NgModule({
  imports: [CommonModule, ChartsModule, MaterialModule, TileModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SourceGraphsModule {}
