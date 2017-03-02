import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { EffectsModule } from '@ngrx/effects'

import { StudyEffects } from '../../shared/store/study/study.effects'
import { StudyService } from '../../shared/store/study/study.service'
import { StudyPageComponent } from './study.component'
import { StudyRoutingModule } from './study.routing'

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    StudyRoutingModule,
    EffectsModule.run(StudyEffects)
  ],
  declarations: [
    StudyPageComponent
  ],
  providers: [
    StudyService
  ]
})
export class StudyModule {}
