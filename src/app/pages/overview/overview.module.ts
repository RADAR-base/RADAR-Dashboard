import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { OverviewPageComponent } from './containers/overview.component'
import { routes } from './routing/overview.routing'
import { OverviewService } from './services/overview.service'
import { OverviewEffects } from './store/overview.effects'
import { reducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    StoreModule.forFeature('overview', reducers),
    EffectsModule.forFeature([OverviewEffects])
  ],
  declarations: [OverviewPageComponent],
  providers: [OverviewService]
})
export class OverviewPageModule {}
