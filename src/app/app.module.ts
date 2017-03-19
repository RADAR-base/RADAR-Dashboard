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
import { NotFoundPageModule } from './pages/not-found/not-found.module'

import { OverviewPageModule } from './pages/overview/overview.module'
import { PatientPageModule } from './pages/patient/patient.module'
import { StudyPageModule } from './pages/study/study.module'
import { StudyGuard } from './shared/guards/study.guard'
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
    StudyPageModule,
    PatientPageModule,
    NotFoundPageModule,
    OverviewPageModule,

    // Routing
    AppRoutingModule
  ],
  providers: [
    UserService,
    ConfigService,
    ErrorService,
    StudyGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
