import { Routes } from '@angular/router'

import { SubjectPageComponent } from './subject.component'

export const routes: Routes = [
  {
    path: 'study/:studyId/subject/:subjectId',
    component: SubjectPageComponent
  },
  {
    path: 'study/:studyId/subject/:subjectId/:startTime/:endTime',
    component: SubjectPageComponent
  }
]
