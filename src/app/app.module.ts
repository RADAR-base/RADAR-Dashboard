import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing'
import { NotFoundPageModule } from './pages/not-found/not-found.module'
import { OverviewPageModule } from './pages/overview/overview.module'
import { StudyPageModule } from './pages/study/study.module'
import { SubjectPageModule } from './pages/subject/subject.module'
import { StudyGuard } from './shared/guards/study.guard'
import { ErrorService } from './shared/services/error.service'
import { ComplianceEffects } from './shared/store/compliance/compliance.effects'
import { ConfigEffects } from './shared/store/config/config.effects'
import { ConfigService } from './shared/store/config/config.service'
import { SensorsEffects } from './shared/store/sensors/sensors.effects'
import { SourceEffects } from './shared/store/source/source.effects'
import { StudyEffects } from './shared/store/study/study.effects'
import { SubjectEffects } from './shared/store/subject/subject.effects'
import { metaReducers, reducers } from './shared/store'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,

    // ngrx/store
    StoreModule.forRoot(reducers, { metaReducers }),

    // Redux Devtools
    // https://github.com/zalmoxisus/redux-devtools-extension
    !environment.PROD ? StoreDevtoolsModule.instrument() : [],

    // Setup ngrx/effects
    EffectsModule.forRoot([
      ConfigEffects,
      StudyEffects,
      SubjectEffects,
      SourceEffects,
      SensorsEffects,
      ComplianceEffects
    ]),

    // App modules
    StudyPageModule,
    SubjectPageModule,
    NotFoundPageModule,
    OverviewPageModule,

    // Routing
    AppRoutingModule
  ],
  providers: [ConfigService, ErrorService, StudyGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
