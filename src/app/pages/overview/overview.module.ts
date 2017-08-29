import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { OverviewPageComponent } from './overview.component'
import { routes } from './overview.routing'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    ToolbarModule
  ],
  declarations: [OverviewPageComponent],
  providers: []
})
export class OverviewPageModule {}
