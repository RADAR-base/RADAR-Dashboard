import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ToolbarModule } from '../core/components/toolbar/toolbar.module'
import { MaterialModule } from '../material'
import { OverviewPageComponent } from './containers/overview-page'
import { routes } from './overview-page.routing'
import { StudiesService } from './services/studies.service'
import { reducers } from './store'
import { StudiesEffects } from './store/studies/studies.effects'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('overviewPage', reducers),
    EffectsModule.forFeature([StudiesEffects])
  ],
  declarations: [OverviewPageComponent],
  providers: [StudiesService]
})
export class OverviewPageModule {}
