import { Routes } from '@angular/router'
import { StudyGuard } from '../../shared/guards/study.guard'
import { PatientPageComponent } from './patient.component'

export const routes: Routes = [
  {
    path: 'study/:studyId/patient/:patientId',
    component: PatientPageComponent,
    canActivate: [StudyGuard]
  }
]
