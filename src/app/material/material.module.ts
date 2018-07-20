import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material'

const MAT_MODULES = [
  CdkTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatMenuModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES
})
export class MaterialModule {}
