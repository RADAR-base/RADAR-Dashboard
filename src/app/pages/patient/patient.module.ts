///<reference path="../../shared/store/tile-questionnaire/tile-questionnaire.effects.ts"/>
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'

import { DashboardGridModule } from '../../components/dashboard-grid/dashboard-grid.module'
import { GridEffects } from '../../shared/store/grid/grid.effects'
import { TileAccelerationEffects } from '../../shared/store/tile-acceleration/tile-acceleration.effects'
import { TileAccelerationService } from '../../shared/store/tile-acceleration/tile-acceleration.service'
import { TileHeartRateEffects } from '../../shared/store/tile-heart-rate/tile-heart-rate.effects'
import { TileHeartRateService } from '../../shared/store/tile-heart-rate/tile-heart-rate.service'
import { TileQuestionnaireEffects } from '../../shared/store/tile-questionnaire/tile-questionnaire.effects'
import { TileQuestionnaireService } from '../../shared/store/tile-questionnaire/tile-questionnaire.service'
import { TileStepsEffects } from '../../shared/store/tile-steps/tile-steps.effects'
import { TileStepsService } from '../../shared/store/tile-steps/tile-steps.service'
import { PatientPageComponent } from './patient.component'
import { PatientRoutingModule } from './patient.routing'
import { GridService } from '../../shared/store/grid/grid.service'

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    DashboardGridModule,

    EffectsModule.run(GridEffects),
    EffectsModule.run(TileHeartRateEffects),
    EffectsModule.run(TileAccelerationEffects),
    EffectsModule.run(TileStepsEffects),
    EffectsModule.run(TileQuestionnaireEffects)
  ],
  declarations: [
    PatientPageComponent
  ],
  providers: [
    GridService,
    TileHeartRateService,
    TileAccelerationService,
    TileStepsService,
    TileQuestionnaireService
  ]
})
export class PatientModule {}
