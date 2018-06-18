import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { StudiesPageComponent } from './containers/studies-page'

export const routes: Routes = [
  {
    path: '',
    component: StudiesPageComponent,
    canActivate: [AuthGuard]
  }
]
