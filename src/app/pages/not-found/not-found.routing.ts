import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './not-found.component'

const routes: Routes = [
  { path: '', component: NotFoundPageComponent },
  { path: 'not-found', component: NotFoundPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFoundRoutingModule {}
