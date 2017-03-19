import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { NotFoundPageComponent } from './not-found.component'

const COMPONENTS = [
  NotFoundPageComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class NotFoundPageModule {}
