import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartBaseAreaComponent } from './chart-base-area/chart-base-area.component'
import { ChartBaseBarComponent } from './chart-base-bar/chart-base-bar.component'
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component'
import { ChartBaseMultiBarComponent } from './chart-base-multi-bar/chart-base-multi-bar.component'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line/chart-base-multi-line.component'
import { ChartBaseComponent } from './chart-base/chart-base.component'
import { ChartDateAxisComponent } from './chart-date-axis/chart-date-axis.component'

const COMPONENTS = [
  ChartBaseComponent,
  ChartBaseLineComponent,
  ChartBaseBarComponent,
  ChartBaseMultiLineComponent,
  ChartBaseMultiBarComponent,
  ChartDateAxisComponent,
  ChartBaseAreaComponent
]

@NgModule({
  imports: [CommonModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ChartsModule {}
