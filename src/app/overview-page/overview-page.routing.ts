import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { OverviewPageComponent } from './containers/overview-page'

export const routes: Routes = [
  {
    path: '',
    component: OverviewPageComponent,
    canActivate: [AuthGuard]
  }
]
