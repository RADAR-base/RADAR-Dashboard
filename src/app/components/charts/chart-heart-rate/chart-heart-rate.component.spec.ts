/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ChartHeartRateComponent } from './chart-heart-rate.component';

describe('ChartHeartRateComponent', () => {
  let component: ChartHeartRateComponent;
  let fixture: ComponentFixture<ChartHeartRateComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          ChartHeartRateComponent
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHeartRateComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate the chart', () => {
    setTimeout(() => {
      expect(element.nativeElement.querySelector('.chart')).toBeTruthy();
    }, 500);
  });
});
