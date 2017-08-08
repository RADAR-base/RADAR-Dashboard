import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'

import { SourceGraphsModule } from '../../components/source-graphs/source-graphs.module'
import { SourceListModule } from '../../components/source-list/source-list.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { SensorsService } from '../../shared/store/sensors/sensors.service'
import { SourceService } from '../../shared/store/source/source.service'
import { SubjectService } from '../../shared/store/subject/subject.service'
import { SubjectPageComponent } from './subject.component'
import { routes } from './subject.routing'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    MdGridListModule,
    SourceListModule,
    SourceGraphsModule,
    TileModule,
    ToolbarModule
  ],
  declarations: [SubjectPageComponent],
  providers: [SubjectService, SourceService, SensorsService]
})
export class SubjectPageModule {}
