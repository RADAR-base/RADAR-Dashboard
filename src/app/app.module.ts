import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import { BrowserModule } from '@angular/platform-browser'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { ConfigEffects } from './shared/store/config/config.effects'
import { ConfigService } from './shared/store/config/config.service'
import { GridEffects } from './shared/store/grid/grid.effects'
import { GridService } from './shared/store/grid/grid.service'
import { reducer } from './shared/store'
import { TileAccelerationEffects } from './shared/store/tile-acceleration/tile-acceleration.effects'
import { TileAccelerationService } from './shared/store/tile-acceleration/tile-acceleration.service'
import { TileHeartRateEffects } from './shared/store/tile-heart-rate/tile-heart-rate.effects'
import { TileHeartRateService } from './shared/store/tile-heart-rate/tile-heart-rate.service'
import { TileQuestionnaireEffects } from './shared/store/tile-questionnaire/tile-questionnaire.effects'
import { TileQuestionnaireService } from './shared/store/tile-questionnaire/tile-questionnaire.service'
import { TileStepsEffects } from './shared/store/tile-steps/tile-steps.effects'
import { TileStepsService } from './shared/store/tile-steps/tile-steps.service'
import { UserEffects } from './shared/store/user/user.effects'
import { UserService } from './shared/store/user/user.service'
import { NotFoundModule } from './pages/not-found/not-found.module'
import { PatientModule } from './pages/patient/patient.module'
import { StudyModule } from './pages/study/study.module'
import { ErrorService } from './shared/services/error.service'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule,

    // ngrx/store
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // Setup ngrx/effects
    EffectsModule.run(GridEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(ConfigEffects),
    EffectsModule.run(TileHeartRateEffects),
    EffectsModule.run(TileAccelerationEffects),
    EffectsModule.run(TileStepsEffects),
    EffectsModule.run(TileQuestionnaireEffects),

    // App modules
    AppRoutingModule,
    StudyModule,
    PatientModule,
    NotFoundModule
  ],
  providers: [
    GridService,
    UserService,
    ConfigService,
    ErrorService,
    TileHeartRateService,
    TileAccelerationService,
    TileStepsService,
    TileQuestionnaireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
