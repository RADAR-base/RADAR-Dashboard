import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdProgressSpinnerModule } from '@angular/material'

import { ChartsModule } from '../charts/charts.module'
import { GraphExternalXAxisComponent } from './graph-external-x-axis/graph-external-x-axis.component'
import { SourceGraphComponent } from './source-graph/source-graph.component'
import { SourceGraphsComponent } from './source-graphs.component'

const COMPONENTS = [
  SourceGraphsComponent,
  SourceGraphComponent,
  GraphExternalXAxisComponent
]

@NgModule({
  imports: [CommonModule, ChartsModule, MdProgressSpinnerModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SourceGraphsModule {}
