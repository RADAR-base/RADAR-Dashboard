import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { routes } from './overview-page.routing'
import { StudiesService } from './services/studies.service'
import { StudiesEffects } from './store/studies/studies.effects'
import { OverviewPageComponent } from './containers/overview-page'
import { reducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('overviewPage', reducers),
    EffectsModule.forFeature([StudiesEffects])
  ],
  declarations: [OverviewPageComponent],
  providers: [StudiesService]
})
export class OverviewPageModule {}
