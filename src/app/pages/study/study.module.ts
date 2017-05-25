import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { StudyPageComponent } from './study.component'
import { routes } from './study.routing'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StudyPageComponent
  ]
})
export class StudyPageModule {}
