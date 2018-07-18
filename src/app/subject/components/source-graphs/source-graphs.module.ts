import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartsModule } from '../../../charts/charts.module'
import { MaterialModule } from '../../../material'
import { SourceDateAxisComponent } from './source-date-axis/source-date-axis.component'
import { SourceGraphComponent } from './source-graph/source-graph.component'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceTooltipComponent } from './source-tooltip/source-tooltip.component'
import { SourceVolumeTimeFrameComponent } from './source-volume-timeframe/source-volume-timeframe'
import { SourceVolumeComponent } from './source-volume/source-volume.component'

const COMPONENTS = [
  SourceGraphsComponent,
  SourceGraphComponent,
  SourceTooltipComponent,
  SourceDateAxisComponent,
  SourceVolumeComponent,
  SourceVolumeTimeFrameComponent
]

@NgModule({
  imports: [CommonModule, ChartsModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SourceGraphsModule {}
