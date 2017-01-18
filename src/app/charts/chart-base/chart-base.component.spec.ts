import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBaseComponent } from './chart-base.component';
import { DebugElement } from '@angular/core';
import { MockTimeSeriesData, parseMockTimeSeriesData } from '../../test/mock-timeseries-data';

describe('ChartBaseComponent', () => {
  let component: ChartBaseComponent;
  let fixture: ComponentFixture<ChartBaseComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseComponent]
    });

    fixture = TestBed.createComponent(ChartBaseComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a chart', () => {
    expect(element.querySelector('g.chart')).toBeTruthy();
  });

  it('should create the axis', () => {
    expect(element.querySelector('g.axis.axis--x')).toBeTruthy();
    expect(element.querySelector('g.axis.axis--y')).toBeTruthy();
  });

  it('should update() and change size if data changes', () => {
    // without data
    expect(component.width).toBeFalsy();
    expect(component.height).toBeFalsy();
    expect(component.chartData).toBeFalsy();

    // with data // needs to be parsed //
    component.chartData = parseMockTimeSeriesData(MockTimeSeriesData);
    expect(component.width).toBeGreaterThan(0);
    expect(component.height).toBeGreaterThan(0);
  });
});
