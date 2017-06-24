import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'

import { SourceGraphModule } from '../../components/source-graph/source-graph.module'
import { SourceListModule } from '../../components/source-list/source-list.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { SubjectPageComponent } from './subject.component'
import { routes } from './subject.routing'
import { SourceService } from '../../shared/store/source/source.service'
import { SensorsService } from '../../shared/store/sensors/sensors.service'
import { SubjectService } from '../../shared/store/subject/subject.service'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    MdGridListModule,
    SourceListModule,
    SourceGraphModule,
    TileModule,
    ToolbarModule
  ],
  declarations: [
    SubjectPageComponent
  ],
  providers: [
    SubjectService,
    SourceService,
    SensorsService
  ]
})
export class SubjectPageModule {}
