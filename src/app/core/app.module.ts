import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { ENV } from '../../environments/environment'
import { AppRoutingModule } from './app.routing'
import { AppComponent } from './containers/app.component'
import { NotFoundPageComponent } from './containers/not-found/not-found.component'
import { ConfigService } from './services/config.service'
import { ErrorService } from './services/error.service'
import { RadarServicesInterceptor } from './services/radar-services.interceptor'
import { metaReducers } from './store'

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // ngrx/store
    StoreModule.forRoot(metaReducers),

    // Redux Devtools
    // https://github.com/zalmoxisus/redux-devtools-extension
    // NOTE: Beware of the performance cost!
    // https://github.com/ngrx/store-devtools/issues/45
    ENV.TOOLS ? StoreDevtoolsModule.instrument() : [],

    // Setup ngrx/effects
    EffectsModule.forRoot([]),

    // Routing
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RadarServicesInterceptor,
      multi: true
    },
    ConfigService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
