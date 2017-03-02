import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// TODO: Lazyload modules when router bug is fixed https://github.com/angular/angular/issues/12869
export const routes: Routes = [
  { path: 'study', redirectTo: 'study', pathMatch: 'prefix' },
  { path: 'patient', redirectTo: 'patient', pathMatch: 'prefix' },
  { path: '', redirectTo: 'study', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
