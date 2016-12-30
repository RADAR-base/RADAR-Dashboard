import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ChartEmptyComponent } from './chart-empty/chart-empty.component';
import { ChartHeartRateComponent } from './chart-heart-rate/chart-heart-rate.component';
import { ChartContainerComponent } from './chart-container/chart-container.component';
import { ChartBaseLineComponent } from './chart-base-line/chart-base-line.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    ChartEmptyComponent,
    ChartHeartRateComponent,
    ChartContainerComponent,
    ChartBaseLineComponent,
  ],
  providers: [],
  exports: [
    ChartContainerComponent
  ]
})
export class ChartModule {}
