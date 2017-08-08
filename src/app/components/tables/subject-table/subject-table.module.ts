import { CdkTableModule } from '@angular/cdk'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdPaginatorModule, MdTableModule } from '@angular/material'

import { SimpleBarComponent } from '../../../components/simple-bar/simple-bar.component'
import { SubjectTableComponent } from './subject-table.component'

@NgModule({
  imports: [CommonModule, CdkTableModule, MdTableModule, MdPaginatorModule],
  declarations: [SubjectTableComponent, SimpleBarComponent],
  exports: [SubjectTableComponent]
})
export class SubjectTableModule {}
