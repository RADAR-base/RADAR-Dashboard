import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { RadarHttpInterceptorProvider } from './core/services/radar.interceptor'
import { MaterialModule } from './material'
import { CustomRouterStateSerializer } from './shared/utils/custom-router-state-serializer'
import { metaReducers, reducers } from './store'
import { SourceTypesEffects } from './store/source-types/source-types.effects'
import { StudiesModule } from './studies/studies.module'
import { StudyModule } from './study/study.module'
import { SubjectModule } from './subject/subject.module'

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,

    // ngrx/store
    StoreModule.forRoot(reducers, { metaReducers }),

    // Store Router
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),

    // Setup ngrx/effects
    EffectsModule.forRoot([SourceTypesEffects]),

    // JWT HttpClient interceptor
    JwtModule.forRoot({
      config: {
        tokenGetter: AuthService.getToken,
        whitelistedDomains: ['localhost', ENV.API_DOMAIN],
        blacklistedRoutes: [ENV.API_FIREBASE + '/config.json']
      }
    }),

    // Redux Devtools
    // https://github.com/zalmoxisus/redux-devtools-extension
    ENV.TOOLS ? StoreDevtoolsModule.instrument() : [],

    // Auth
    AuthModule.forRoot(),

    // Pages
    StudiesModule,
    StudyModule,
    SubjectModule,

    // Routing
    RouterModule.forRoot(routes)
  ],
  providers: [
    RadarHttpInterceptorProvider,
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
