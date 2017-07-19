import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdTableModule, MdPaginatorModule } from '@angular/material'
import { CdkTableModule } from '@angular/cdk'

import { PatientTableComponent } from './patient-table.component'

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MdTableModule,
    MdPaginatorModule
  ],
  declarations: [PatientTableComponent],
  exports: [PatientTableComponent]
})
export class PatientTableModule {}
