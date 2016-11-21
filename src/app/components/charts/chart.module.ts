import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartEmptyComponent } from './chart-empty/chart-empty.component';
import { ChartHeartRateComponent } from './chart-heart-rate/chart-heart-rate.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ChartEmptyComponent,
    ChartHeartRateComponent
  ],
  exports: [
    ChartEmptyComponent,
    ChartHeartRateComponent,
    CommonModule
  ]
})
export class ChartModule {}
