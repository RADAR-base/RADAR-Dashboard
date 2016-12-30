import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers/index';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GridService } from './services/grid.service';
import { ErrorService } from './services/error.service';
import { GridEffects } from './effects/grid';
import { EffectsModule } from '@ngrx/effects';
import { UIProgressComponent } from './components/ui-progress/ui-progress.component';
import { UserEffects } from './effects/user';
import { UserService } from './services/user.service';
import { ChartHeartRateService } from './services/charts/heart-rate.service';
import { ChartHeartRateEffects } from './effects/charts/heart-rate';
import { ChartModule } from './components/charts/chart.module';
import { ConfigEffects } from './effects/config';
import { ConfigService } from './services/config.service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    UIProgressComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterialModule.forRoot(),

    // ngrx/store
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    // Setup ngrx/effects
    EffectsModule.run(GridEffects),
    EffectsModule.run(UserEffects),
    EffectsModule.run(ConfigEffects),
    EffectsModule.run(ChartHeartRateEffects),

    // App modules
    AppRoutingModule,
    ChartModule,
  ],
  providers: [
    GridService,
    UserService,
    ConfigService,
    ErrorService,

    // Chart Services
    ChartHeartRateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
