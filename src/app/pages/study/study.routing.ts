import { Routes } from '@angular/router'

import { StudyGuard } from '../../shared/guards/study.guard'
import { StudyPageComponent } from './study.component'

export const routes: Routes = [
  {
    path: '',
    component: StudyPageComponent,
    canActivate: [StudyGuard]
  }
]
