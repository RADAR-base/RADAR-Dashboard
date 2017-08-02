import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdTableModule, MdPaginatorModule } from '@angular/material'
import { CdkTableModule } from '@angular/cdk'

import { SubjectTableComponent } from './subject-table.component'
import { CompliancePlotTableModule } from '../../compliance-plot-table/compliance-plot-table.module'

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MdTableModule,
    MdPaginatorModule,
    CompliancePlotTableModule
  ],
  declarations: [SubjectTableComponent],
  exports: [SubjectTableComponent]
})
export class SubjectTableModule {}
