/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartHeartRateComponent } from './chart-heart-rate.component';
import { ChartModule } from '../chart.module';
import { reducer } from '../../../reducers/index';
import { StoreModule } from '@ngrx/store';

describe('ChartHeartRateComponent', () => {
  let component: ChartHeartRateComponent;
  let fixture: ComponentFixture<ChartHeartRateComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          ChartModule,
          StoreModule.provideStore(reducer)
        ],
        schemas: [NO_ERRORS_SCHEMA]
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
