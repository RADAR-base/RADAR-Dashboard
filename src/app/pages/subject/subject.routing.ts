import { Routes } from '@angular/router'
import { StudyGuard } from '../../shared/guards/study.guard'
import { SubjectPageComponent } from './subject.component'

export const routes: Routes = [
  {
    path: 'study/:studyId/subject/:subjectId',
    component: SubjectPageComponent,
    canActivate: [StudyGuard]
  }
]
