import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdGridListModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DashboardTileModule } from '../dashboard-tile/dashboard-tile.module'
import { ProgressAnimationComponent } from '../progress-animation/progress-animation.component'
import { DashboardGridComponent } from './dashboard-grid.component'

@NgModule({
  imports: [
    CommonModule,
    DashboardTileModule,

    // Material 2
    MdGridListModule,
    BrowserAnimationsModule
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
