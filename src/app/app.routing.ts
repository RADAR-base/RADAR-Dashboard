import { NgModule } from '@angular/core'
import { NoPreloading, RouterModule, Routes } from '@angular/router'

import { NotFoundPageComponent } from './core/containers/not-found/not-found.component'

export const routes: Routes = [
  {
    path: 'study/:studyId/subject/:subjectId',
    loadChildren: './subject-page/subject-page.module#SubjectPageModule'
  },
  {
    path: 'study/:studyId',
    loadChildren: './study-page/study-page.module#StudyPageModule'
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
