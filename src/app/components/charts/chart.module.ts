import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ChartEmptyComponent } from './chart-empty/chart-empty.component';
import { ChartHeartRateComponent } from './chart-heart-rate/chart-heart-rate.component';
import { ChartContainerComponent } from './container/chart-container.component';
import { ChartType } from './chart.type';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ChartEmptyComponent,
    ChartHeartRateComponent,
    ChartContainerComponent
  ],
  providers: [
    ChartType
  ],
  exports: [
    ChartContainerComponent
  ]
})
export class ChartModule {}
