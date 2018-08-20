import { Routes } from '@angular/router'

import { NotFoundPageComponent } from './core/containers/not-found/not-found-page.component'

export const routes: Routes = [
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
]
