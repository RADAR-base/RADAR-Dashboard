import { Routes } from '@angular/router'

import { AuthGuard } from '../auth/services/auth.guard'
import { SubjectComponent } from './containers/subject.component'

export const routes: Routes = [
  {
    path: 'study/:studyName/subject/:subjectId',
    component: SubjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':startTime/:endTime',
    component: SubjectComponent,
    canActivate: [AuthGuard]
  }
]
