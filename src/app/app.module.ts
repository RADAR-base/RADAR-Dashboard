import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { JwtModule } from '@auth0/angular-jwt'
import { EffectsModule } from '@ngrx/effects'
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

import { ENV } from '../environments/environment'
import { routes } from './app.routing'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/services/auth.service'
import { AppComponent } from './core/containers/app.component'
import { NotFoundPageComponent } from './core/containers/not-found/not-found.component'
import { ConfigService } from './core/services/config.service'
import { ErrorService } from './core/services/error.service'
import { RadarHttpInterceptor } from './core/services/radar.interceptor'
import { CustomRouterStateSerializer } from './shared/utils/custom-router-state-serializer'
import { metaReducers, reducers } from './store'
import { PagesEffects } from './store/pages/pages.effects'

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    // Routing
    RouterModule.forRoot(routes),

    // ngrx/store
    StoreModule.forRoot(reducers, { metaReducers }),

    // Store Router
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),

    // Setup ngrx/effects
    EffectsModule.forRoot([PagesEffects]),

    // JWT HttpClient interceptor
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['']
      }
    }),

    // Redux Devtools
    // https://github.com/zalmoxisus/redux-devtools-extension
    // NOTE: Beware of the performance cost!
    // https://github.com/ngrx/store-devtools/issues/45
    ENV.TOOLS ? StoreDevtoolsModule.instrument() : [],

    // Auth
    AuthModule.forRoot()
  ],
  providers: [
    RadarHttpInterceptor,
    ConfigService,
    ErrorService,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
