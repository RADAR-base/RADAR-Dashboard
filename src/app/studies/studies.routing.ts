import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { StudiesPageComponent } from './containers/studies-page.component'

export const routes: Routes = [
  {
    path: '',
    component: StudiesPageComponent,
    canActivate: [AuthGuard]
  }
]
