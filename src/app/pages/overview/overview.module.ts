import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { StudyService } from '../../shared/store/study/study.service'
import { OverviewPageComponent } from './overview.component'
import { routes } from './overview.routing'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  declarations: [
    OverviewPageComponent
  ],
  providers: [
    StudyService
  ]
})
export class OverviewPageModule {}
