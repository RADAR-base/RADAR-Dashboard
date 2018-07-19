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
import { SourceToggleResolutionModule } from './components/source-toggle-resolution/source-toggle-resolution.module'
import { SubjectComponent } from './containers/subject.component'
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
    SourceToggleResolutionModule,
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
  declarations: [SubjectComponent],
  providers: [SourcesService, SensorsDataService, VolumeDataService]
})
export class SubjectModule {}
