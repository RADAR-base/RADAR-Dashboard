import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { SubjectPageComponent } from './containers/subject-page.component'

export const routes: Routes = [
  {
    path: 'study/:studyName/subject/:subjectId',
    component: SubjectPageComponent,
    canActivate: [AuthGuard]
  }
]
