import { CdkTableModule } from '@angular/cdk/table'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material'

import { SimpleBarComponent } from '../simple-bar/simple-bar.component'
import { SubjectTableComponent } from './subject-table.component'
import { SubjectPaginatorIntl } from './subject-paginator-intl'

const COMPONENTS = [SubjectTableComponent, SimpleBarComponent]

@NgModule({
  imports: [CommonModule, CdkTableModule, MatTableModule, MatPaginatorModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [{ provide: MatPaginatorIntl, useClass: SubjectPaginatorIntl }]
})
export class SubjectTableModule {}
