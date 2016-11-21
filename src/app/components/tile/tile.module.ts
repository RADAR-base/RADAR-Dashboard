import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from '../charts/chart.module';
import { TileComponent } from './tile.component';
import { TileType } from './tile.type';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
  ],
  declarations: [
    TileComponent,
  ],
  exports: [
    CommonModule,
    TileComponent
  ],
  providers: [
    TileType
  ]
})
export class TileModule {}
