import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { TileModule } from '../core/components/tile/tile.module'
import { ToolbarModule } from '../core/components/toolbar/toolbar.module'
import { MaterialModule } from '../material'
import { SourceGraphsModule } from './components/source-graphs/source-graphs.module'
import { SourceListModule } from './components/source-list/source-list.module'
import { SourceTogglesModule } from './components/source-toggles/source-toggles.module'
import { SubjectPageComponent } from './containers/subject-page.component'
import { SensorsDataService } from './services/sensors-data.service'
import { SourcesService } from './services/sources.service'
import { VolumeDataService } from './services/volume-data.service'
import { reducers } from './store'
import { SensorsDataEffects } from './store/sensors-data/sensors-data.effects'
import { SourcesEffects } from './store/sources/sources.effects'
import { VolumeDataEffects } from './store/volume-data/volume-data.effects'
import { routes } from './subject.routing'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SourceListModule,
    SourceGraphsModule,
    SourceTogglesModule,
    TileModule,
    ToolbarModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('subject', reducers),
    EffectsModule.forFeature([
      SourcesEffects,
      SensorsDataEffects,
      VolumeDataEffects
    ])
  ],
  declarations: [SubjectPageComponent],
  providers: [SourcesService, SensorsDataService, VolumeDataService]
})
export class SubjectModule {}
