import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdTableModule, MdPaginatorModule } from '@angular/material'
import { CdkTableModule } from '@angular/cdk'

import { SubjectTableComponent } from './subject-table.component'

@NgModule({
  imports: [
    CommonModule,
    CdkTableModule,
    MdTableModule,
    MdPaginatorModule
  ],
  declarations: [SubjectTableComponent],
  exports: [SubjectTableComponent]
})
export class SubjectTableModule {}
