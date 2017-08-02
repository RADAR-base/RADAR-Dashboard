import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartBaseComponent } from './chart-base/chart-base.component'
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component'
import { ChartBaseBarComponent } from './chart-base-bar/chart-base-bar.component'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line/chart-base-multi-line.component'
import { ChartBaseMultiBarComponent } from './chart-base-multi-bar/chart-base-multi-bar.component'
import { ChartBaseMultiBarTableComponent } from './chart-base-multi-bar-table/chart-base-multi-bar-table.component'

const COMPONENTS = [
  ChartBaseComponent,
  ChartBaseLineComponent,
  ChartBaseBarComponent,
  ChartBaseMultiLineComponent,
  ChartBaseMultiBarComponent,
  ChartBaseMultiBarTableComponent
]

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class ChartsModule {}
