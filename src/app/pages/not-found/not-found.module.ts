import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { NotFoundPageComponent } from './not-found.component'
import { NotFoundRoutingModule } from './not-found.routing'

const COMPONENTS = [
  NotFoundPageComponent
]

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class NotFoundModule {}
