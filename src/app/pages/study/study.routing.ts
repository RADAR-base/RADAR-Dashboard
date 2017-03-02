import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { StudyPageComponent } from './study.component'

const routes: Routes = [
  { path: 'study', component: StudyPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
