import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartBaseBarComponent } from './chart-base-bar/chart-base-bar.component'
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line/chart-base-multi-line.component'
import { ChartBaseComponent } from './chart-base/chart-base.component'

const COMPONENTS = [
  ChartBaseComponent,
  ChartBaseLineComponent,
  ChartBaseBarComponent,
  ChartBaseMultiLineComponent
]

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class ChartsModule {}
