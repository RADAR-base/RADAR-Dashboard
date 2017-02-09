import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBaseMultiLineComponent } from './chart-base-multi-line.component';
import { DebugElement } from '@angular/core';
import { MockMultiTimeSeriesData, parseMockMultiTimeSeriesData } from '../../test/mock-multi-timeseries-data';

describe('ChartBaseMultiLineComponent', () => {
  let component: ChartBaseMultiLineComponent;
  let fixture: ComponentFixture<ChartBaseMultiLineComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseMultiLineComponent]
    });

    fixture = TestBed.createComponent(ChartBaseMultiLineComponent);
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

  it('should update() and change size if data changes', () => {
    // without data
    expect(component.width).toBeFalsy();
    expect(component.height).toBeFalsy();
    expect(component.chartData).toBeFalsy();

    // with data // needs to be parsed //
    component.chartData = parseMockMultiTimeSeriesData(MockMultiTimeSeriesData);
    expect(component.width).toBeGreaterThan(0);
    expect(component.height).toBeGreaterThan(0);
  });

  it('path.line should have attribute "d" when data changes', () => {
    const lineElements: any = element.querySelectorAll('path.line');
    const attr = 'd';

    // without data
    for (const el of lineElements) {
      expect(el.getAttribute(attr)).toBeFalsy();
    }

    // with data // needs to be parsed //
    component.chartData = parseMockMultiTimeSeriesData(MockMultiTimeSeriesData);
    for (const el of lineElements) {
      expect(el.getAttribute(attr)).toBeTruthy();
    }
  });
});
