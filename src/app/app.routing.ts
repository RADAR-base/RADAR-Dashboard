import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { OverviewPageComponent } from './pages/overview/overview.component'
import { StudyPageComponent } from './pages/study/study.component'
import { StudyGuard } from './shared/guards/study.guard'
import { NotFoundPageComponent } from './pages/not-found/not-found.component'
import { PatientPageComponent } from './pages/patient/patient.component'

// TODO: Lazyload modules when router bug is fixed https://github.com/angular/angular/issues/12869
export const routes: Routes = [
  { path: 'study/:studyId', component: StudyPageComponent, canActivate: [StudyGuard] },
  { path: 'study/:studyId/patient/:patientId', component: PatientPageComponent, canActivate: [StudyGuard] },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: '', component: OverviewPageComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
