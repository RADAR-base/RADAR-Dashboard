import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { ENV } from '../environments/environment'
import { AppRoutingModule } from './app.routing'
import { AppComponent } from './core/containers/app.component'
import { NotFoundPageComponent } from './core/containers/not-found/not-found.component'
import { ConfigService } from './core/services/config.service'
import { ErrorService } from './core/services/error.service'
import { RadarHttpInterceptor } from './core/services/radar.interceptor'
import { PagesEffects } from './core/store/pages/pages.effects'
import { metaReducers } from './core/store'

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // ngrx/store
    StoreModule.forRoot(metaReducers),

    // Setup ngrx/effects
    EffectsModule.forRoot([PagesEffects]),

    // Redux Devtools
    // https://github.com/zalmoxisus/redux-devtools-extension
    // NOTE: Beware of the performance cost!
    // https://github.com/ngrx/store-devtools/issues/45
    ENV.TOOLS ? StoreDevtoolsModule.instrument() : [],

    // Routing
    AppRoutingModule
  ],
  providers: [RadarHttpInterceptor, ConfigService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
