import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { ToolbarModule } from '../core/components/toolbar/toolbar.module'
import { MaterialModule } from '../material'
import { StudiesPageComponent } from './containers/studies-page'
import { StudiesService } from './services/studies.service'
import { StudiesEffects } from './store/studies.effects'
import { reducer } from './store/studies.reducer'
import { routes } from './studies.routing'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('studies', reducer),
    EffectsModule.forFeature([StudiesEffects])
  ],
  declarations: [StudiesPageComponent],
  providers: [StudiesService]
})
export class StudiesModule {}
