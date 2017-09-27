import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { CompliancePlotModule } from '../../components/compliance-plot/compliance-plot.module'
import { SubjectTableModule } from '../../components/subject-table/subject-table.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { StudyPageComponent } from './containers/study.component'
import { StudyGuard } from './guards/study.guard'
import { routes } from './routing/study.routing'
import { ComplianceService } from './services/compliance.service'
import { StudyService } from './services/study.service'
import { SubjectService } from './services/subject.service'
import { ComplianceEffects } from './store/compliance/compliance.effects'
import { StudyEffects } from './store/study/study.effects'
import { SubjectEffects } from './store/subject/subject.effects'
import { reducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TileModule,
    ToolbarModule,
    MdGridListModule,
    SubjectTableModule,
    CompliancePlotModule,
    StoreModule.forFeature('study-page', reducers),
    EffectsModule.forFeature([StudyEffects, SubjectEffects, ComplianceEffects])
  ],
  declarations: [StudyPageComponent],
  providers: [StudyGuard, StudyService, SubjectService, ComplianceService]
})
export class StudyPageModule {}
