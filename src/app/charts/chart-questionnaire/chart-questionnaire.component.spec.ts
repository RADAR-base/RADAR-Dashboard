import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChartQuestionnaireComponent } from './chart-questionnaire.component';
import { ChartModule } from '../chart.module';
import { reducer } from '../../store';
import { StoreModule } from '@ngrx/store';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

describe('ChartQuestionnaireComponent', () => {
  let component: ChartQuestionnaireComponent;
  let fixture: ComponentFixture<ChartQuestionnaireComponent>;
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

    fixture = TestBed.createComponent(ChartQuestionnaireComponent);
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
