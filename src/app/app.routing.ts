import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'study/:studyId',
    loadChildren: './pages/study/study.module#StudyPageModule'
  },
  {
    path: 'study/:studyId/subject/:subjectId',
    loadChildren: './pages/subject/subject.module#SubjectPageModule'
  },
  {
    path: 'not-found',
    loadChildren: './pages/not-found/not-found.module#NotFoundPageModule'
  },
  {
    path: '',
    loadChildren: './pages/overview/overview.module#OverviewPageModule'
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
