import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdGridListModule } from '@angular/material'
import { RouterModule } from '@angular/router'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { SourceGraphsModule } from '../../components/source-graphs/source-graphs.module'
import { SourceListModule } from '../../components/source-list/source-list.module'
import { TileModule } from '../../components/tile/tile.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { SubjectPageComponent } from './containers/subject.component'
import { routes } from './routing/subject.routing'
import { SensorsDataService } from './services/sensors-data.service'
import { SensorsService } from './services/sensors.service'
import { SourcesService } from './services/sources.service'
import { SensorsDataEffects } from './store/sensors-data/sensors-data.effects'
import { SensorsEffects } from './store/sensors/sensors.effects'
import { SourcesEffects } from './store/sources/sources.effects'
import { reducers } from './store'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdGridListModule,
    SourceListModule,
    SourceGraphsModule,
    TileModule,
    ToolbarModule,
    StoreModule.forFeature('subject-page', reducers),
    EffectsModule.forFeature([
      SourcesEffects,
      SensorsEffects,
      SensorsDataEffects
    ])
  ],
  declarations: [SubjectPageComponent],
  providers: [SourcesService, SensorsService, SensorsDataService]
})
export class SubjectPageModule {}
