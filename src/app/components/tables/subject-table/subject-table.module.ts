import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdTableModule, MdPaginatorModule } from '@angular/material'
import { CdkTableModule } from '@angular/cdk'

import { SubjectTableComponent } from './subject-table.component'
import { SimpleBarComponent } from '../../../components/simple-bar/simple-bar.component'

@NgModule({
  imports: [CommonModule, CdkTableModule, MdTableModule, MdPaginatorModule],
  declarations: [SubjectTableComponent, SimpleBarComponent],
  exports: [SubjectTableComponent]
})
export class SubjectTableModule {}
