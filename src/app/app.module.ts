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
import { NotFoundModule } from './pages/not-found/not-found.module'
import { PatientModule } from './pages/patient/patient.module'
import { StudyModule } from './pages/study/study.module'
import { ErrorService } from './shared/services/error.service'
import { reducer } from './shared/store'
import { ConfigEffects } from './shared/store/config/config.effects'
import { ConfigService } from './shared/store/config/config.service'
import { UserEffects } from './shared/store/user/user.effects'
import { UserService } from './shared/store/user/user.service'

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
    EffectsModule.run(UserEffects),
    EffectsModule.run(ConfigEffects),

    // App modules
    AppRoutingModule,
    StudyModule,
    PatientModule,
    NotFoundModule
  ],
  providers: [
    UserService,
    ConfigService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
