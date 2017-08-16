import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ChartsModule } from '../charts/charts.module'
import { GraphBaseComponent } from './graph-base/graph-base.component'
import { GraphMultiLineComponent } from './graph-multi-line/graph-multi-line.component'
import { GraphSingleLineComponent } from './graph-single-line/graph-single-line.component'
import { SourceGraphsComponent } from './source-graphs.component'
import { SourceGraphsService } from './source-graphs.service'

@NgModule({
  imports: [CommonModule, ChartsModule],
  declarations: [
    SourceGraphsComponent,
    GraphSingleLineComponent,
    GraphMultiLineComponent,
    GraphBaseComponent
  ],
  providers: [SourceGraphsService],
  exports: [SourceGraphsComponent]
})
export class SourceGraphsModule {}
