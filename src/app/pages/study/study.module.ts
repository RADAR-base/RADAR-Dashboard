import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { StudyPageComponent } from './study.component'
import { StudyRoutingModule } from './study.routing'

@NgModule({
  imports: [
    CommonModule,
    StudyRoutingModule
  ],
  declarations: [
    StudyPageComponent
  ]
})
export class StudyModule {}
