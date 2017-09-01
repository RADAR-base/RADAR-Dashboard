import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MdPaginatorModule, MdTableModule } from '@angular/material'

import { SimpleBarComponent } from '../../../components/simple-bar/simple-bar.component'
import { SubjectTableComponent } from './subject-table.component'

const COMPONENTS = [SubjectTableComponent, SimpleBarComponent]

@NgModule({
  imports: [CommonModule, CdkTableModule, MdTableModule, MdPaginatorModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SubjectTableModule {}
