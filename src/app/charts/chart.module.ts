import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ChartEmptyComponent } from './chart-empty/chart-empty.component';
import { ChartHeartRateComponent } from './chart-heart-rate/chart-heart-rate.component';
import { ChartAccelerationComponent } from './chart-acceleration/chart-acceleration.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component';
import { ChartBaseMultiLineComponent } from './chart-base-multi-line/chart-base-multi-line.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartBaseComponent } from './chart-base/chart-base.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    ChartBaseComponent,
    ChartBaseLineComponent,
    ChartBaseMultiLineComponent,
    ChartEmptyComponent,
    ChartHeartRateComponent,
    ChartAccelerationComponent,
    ChartContainerComponent,
  ],
  providers: [],
  exports: [
    ChartContainerComponent,
  ]
})
export class ChartModule {}
