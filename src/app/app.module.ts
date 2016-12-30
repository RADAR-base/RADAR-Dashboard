import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './store/index';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GridService } from './services/grid.service';
import { ErrorService } from './services/error.service';
import { GridEffects } from './store/grid/grid.effects';
import { EffectsModule } from '@ngrx/effects';
import { UIProgressComponent } from './components/ui-progress/ui-progress.component';
import { UserEffects } from './store/user/user.effects';
import { UserService } from './services/user.service';
import { ChartHeartRateEffects } from './store/chart-heart-rate/chart-heart-rate.effects';
import { ChartModule } from './charts/chart.module';
import { ConfigEffects } from './store/config/config.effects';
import { ConfigService } from './services/config.service';
import { ChartHeartRateService } from './services/chart-heart-rate.service';

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
    ChartHeartRateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
