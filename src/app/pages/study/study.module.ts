import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'

import { CompliancePlotModule } from '../../components/compliance-plot/compliance-plot.module'
import { SubjectTableModule } from '../../components/tables/subject-table/subject-table.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { StudyGuard } from '../../shared/guards/study.guard'
import { StudyPageComponent } from './study.component'
import { routes } from './study.routing'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TileModule,
    ToolbarModule,
    MdGridListModule,
    SubjectTableModule,
    CompliancePlotModule
  ],
  declarations: [StudyPageComponent],
  providers: [StudyGuard]
})
export class StudyPageModule {}
