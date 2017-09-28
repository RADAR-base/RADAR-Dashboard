import { NgModule } from '@angular/core'
import { NoPreloading, RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './pages/not-found/not-found.component'

export const routes: Routes = [
  {
    path: 'study/:studyId/subject/:subjectId',
    loadChildren: './pages/subject/subject.module#SubjectPageModule'
  },
  {
    path: 'study/:studyId',
    loadChildren: './pages/study/study.module#StudyPageModule'
  },
  {
    path: '',
    loadChildren: './overview-page/overview-page.module#OverviewPageModule'
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
