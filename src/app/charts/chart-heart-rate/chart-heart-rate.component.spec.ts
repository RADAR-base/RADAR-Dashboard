import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChartHeartRateComponent } from './chart-heart-rate.component';
import { ChartModule } from '../chart.module';
import { reducer } from '../../store';
import { StoreModule } from '@ngrx/store';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

describe('ChartHeartRateComponent', () => {
  let component: ChartHeartRateComponent;
  let fixture: ComponentFixture<ChartHeartRateComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartModule,
        MaterialModule.forRoot(),
        StoreModule.provideStore(reducer)
      ]
    });

    fixture = TestBed.createComponent(ChartHeartRateComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the chart', () => {
    expect(element.querySelector('g.chart')).toBeTruthy();
  });
});
