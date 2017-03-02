import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PatientPageComponent } from './patient.component'

const routes: Routes = [
  { path: 'patient', component: PatientPageComponent },
  { path: 'patient/:id', component: PatientPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
