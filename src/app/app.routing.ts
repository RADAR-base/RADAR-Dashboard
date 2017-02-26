import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

export const routes: Routes = [
  { path: 'study', loadChildren: 'app/pages/study/study.module#StudyModule' },
  { path: 'patient', loadChildren: 'app/pages/patient/patient.module#PatientModule' },
  { path: 'not-found', loadChildren: 'app/pages/not-found/not-found.module#NotFoundModule' },
  { path: '', redirectTo: 'study', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
