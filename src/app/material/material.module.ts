import { CdkTableModule } from '@angular/cdk/table'
import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const MAT_MODULES = [
  BrowserAnimationsModule,
  CdkTableModule,
  MatButtonModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
]

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES
})
export class MaterialModule {}
