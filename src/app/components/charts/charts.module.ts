import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartBaseBarComponent } from './chart-base-bar/chart-base-bar.component'
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component'
import { ChartBaseMultiBarComponent } from './chart-base-multi-bar/chart-base-multi-bar.component'
import { ChartBaseMultiLineComponent } from './chart-base-multi-line/chart-base-multi-line.component'
import { ChartBaseComponent } from './chart-base/chart-base.component'
import { ChartExternalXAxisComponent } from './chart-external-x-axis/chart-external-x-axis.component'

const COMPONENTS = [
  ChartBaseComponent,
  ChartBaseLineComponent,
  ChartBaseBarComponent,
  ChartBaseMultiLineComponent,
  ChartBaseMultiBarComponent,
  ChartExternalXAxisComponent
]

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class ChartsModule {}
