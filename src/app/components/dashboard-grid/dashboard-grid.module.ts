import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DashboardTileModule } from '../dashboard-tile/dashboard-tile.module'
import { ProgressAnimationComponent } from '../progress-animation/progress-animation.component'
import { DashboardGridComponent } from './dashboard-grid.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    DashboardTileModule
  ],
  declarations: [
    ProgressAnimationComponent,
    DashboardGridComponent
  ],
  exports: [
    DashboardGridComponent
  ]
})
export class DashboardGridModule {}
