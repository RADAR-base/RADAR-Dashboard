import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'

import { SourceListModule } from '../../components/source-list/source-list.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { SubjectPageComponent } from './subject.component'
import { routes } from './subject.routing'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    MdGridListModule,
    SourceListModule,
    TileModule,
    ToolbarModule
  ],
  declarations: [
    SubjectPageComponent
  ],
  providers: []
})
export class SubjectPageModule {}
