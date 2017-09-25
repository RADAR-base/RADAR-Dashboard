import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MdPaginatorIntl,
  MdPaginatorModule,
  MdTableModule
} from '@angular/material'

import { SimpleBarComponent } from '../simple-bar/simple-bar.component'
import { SubjectTableComponent } from './subject-table.component'
import { SubjectPaginatorIntl } from './subject-paginator-intl'

const COMPONENTS = [SubjectTableComponent, SimpleBarComponent]

@NgModule({
  imports: [CommonModule, CdkTableModule, MdTableModule, MdPaginatorModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [{ provide: MdPaginatorIntl, useClass: SubjectPaginatorIntl }]
})
export class SubjectTableModule {}
