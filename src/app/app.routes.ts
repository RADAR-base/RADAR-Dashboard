import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './components/dashboard/dashboard.component'

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '**', component: DashboardComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
