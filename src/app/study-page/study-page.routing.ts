import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { StudyPageComponent } from './containers/study-page.component'

export const routes: Routes = [
  {
    path: 'study/:studyName',
    component: StudyPageComponent,
    canActivate: [AuthGuard]
  }
]
