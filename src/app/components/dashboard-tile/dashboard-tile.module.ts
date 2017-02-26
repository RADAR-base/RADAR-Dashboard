import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'

import { ChartBaseBarComponent } from './charts/chart-base-bar/chart-base-bar.component'
import { ChartBaseLineComponent } from './charts/chart-base-line/chart-base-line.component'
import { ChartBaseMultiLineComponent } from './charts/chart-base-multi-line/chart-base-multi-line.component'
import { ChartBaseComponent } from './charts/chart-base/chart-base.component'
import { DashboardTileComponent } from './dashboard-tile.component'
import { TileAccelerationComponent } from './tile-acceleration/tile-acceleration.component'
import { TileEmptyComponent } from './tile-empty/tile-empty.component'
import { TileHeartRateComponent } from './tile-heart-rate/tile-heart-rate.component'
import { TileQuestionnaireComponent } from './tile-questionnaire/tile-questionnaire.component'
import { TileStepsComponent } from './tile-steps/tile-steps.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    // Charts
    ChartBaseComponent,
    ChartBaseLineComponent,
    ChartBaseMultiLineComponent,
    ChartBaseBarComponent,
    // Tiles
    TileEmptyComponent,
    TileHeartRateComponent,
    TileAccelerationComponent,
    TileStepsComponent,
    TileQuestionnaireComponent,
    // Container
    DashboardTileComponent
  ],
  exports: [
    DashboardTileComponent
  ]
})
export class DashboardTileModule {}
