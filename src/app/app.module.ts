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
import { TileModule } from './components/tile/tile.module';
import { ErrorService } from './services/error.service';
import { GridEffects } from './effects/grid';
import { EffectsModule } from '@ngrx/effects';
import { UIProgressComponent } from './components/ui-progress/ui-progress.component';
import { UserEffects } from './effects/user';
import { UserService } from './services/user.service';

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
    AppRoutingModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(GridEffects),
    EffectsModule.run(UserEffects),
    TileModule,
  ],
  providers: [
    GridService,
    UserService,
    ErrorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
