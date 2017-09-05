import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartsModule } from '../charts/charts.module'
import { GraphBaseComponent } from './graph-base/graph-base.component'
import { GraphExternalXAxisComponent } from './graph-external-x-axis/graph-external-x-axis.component'
import { GraphMultiLineComponent } from './graph-multi-line/graph-multi-line.component'
import { GraphSingleLineComponent } from './graph-single-line/graph-single-line.component'
import { SourceGraphsComponent } from './source-graphs.component'

const COMPONENTS = [
  SourceGraphsComponent,
  GraphSingleLineComponent,
  GraphMultiLineComponent,
  GraphBaseComponent,
  GraphExternalXAxisComponent
]

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SourceGraphsModule {}
