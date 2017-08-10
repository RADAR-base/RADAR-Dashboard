import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NotFoundPageComponent } from './not-found.component'
import { routes } from './not-found.routing'

const COMPONENTS = [NotFoundPageComponent]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class NotFoundPageModule {}
