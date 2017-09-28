import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ToolbarModule } from '../core/components/toolbar/toolbar.module'
import { routes } from './overview-page.routing'
import { StudiesService } from './services/studies.service'
import { StudiesEffects } from './store/studies/studies.effects'
import { OverviewPageComponent } from './containers/overview-page'
import { reducers } from './store/index'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('overviewPage', reducers),
    EffectsModule.forFeature([StudiesEffects])
  ],
  declarations: [OverviewPageComponent],
  providers: [StudiesService]
})
export class OverviewPageModule {}
