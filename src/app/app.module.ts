import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardTileComponent } from './components/dashboard-item/dashboard-tile.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardTilesService } from './services/dashboard-tiles.service';
import { ChartHeartRateModule } from './components/chart-heart-rate/chart-heart-rate.module';
import { ChartEmptyComponent } from './components/chart-empty/chart-empty.component';
import { TileType } from './shared/tile-type.const';
import { reducer } from './reducers/index';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardTileComponent,
    ToolbarComponent,
    ChartEmptyComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ChartHeartRateModule,
  ],
  providers: [
    DashboardTilesService,
    TileType
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
