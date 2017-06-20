import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { StudyService } from '../../shared/store/study/study.service'
import { SubjectService } from '../../shared/store/subject/subject.service'
import { StudyPageComponent } from './study.component'
import { routes } from './study.routing'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes),
    ToolbarModule
  ],
  declarations: [
    StudyPageComponent
  ],
  providers: [
    StudyService,
    SubjectService
  ]
})
export class StudyPageModule {}
