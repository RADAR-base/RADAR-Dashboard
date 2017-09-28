import { Routes } from '@angular/router'

import { SubjectPageComponent } from './containers/subject-page.component'

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
