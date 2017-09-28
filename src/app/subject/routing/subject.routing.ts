import { Routes } from '@angular/router'

import { SubjectPageComponent } from '../containers/subject.component'

export const routes: Routes = [
  {
    path: '',
    component: SubjectPageComponent
  },
  {
    path: ':startTime/:endTime',
    component: SubjectPageComponent
  }
]
