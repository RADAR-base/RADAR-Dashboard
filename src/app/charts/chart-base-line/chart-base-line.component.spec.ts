import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBaseLineComponent } from './chart-base-line.component';
import { DebugElement } from '@angular/core';
import { MockTimeSeriesData, parseMockTimeSeriesData } from '../../test/mock-timeseries-data';

describe('ChartBaseLineComponent', () => {
  let component: ChartBaseLineComponent;
  let fixture: ComponentFixture<ChartBaseLineComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseLineComponent]
    });

    fixture = TestBed.createComponent(ChartBaseLineComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  describe('=> without @Input', () => {
    beforeEach(() => {
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
      component.chartData = parseMockTimeSeriesData(MockTimeSeriesData);
      expect(component.width).toBeGreaterThan(0);
      expect(component.height).toBeGreaterThan(0);
    });

    it('path.line should have attribute "d" when data changes', () => {
      const lineEl = element.querySelector('path.line');
      const attr = 'd';

      // without data
      expect(lineEl.getAttribute(attr)).toBeFalsy();

      // with data // needs to be parsed //
      component.chartData = parseMockTimeSeriesData(MockTimeSeriesData);
      expect(lineEl.getAttribute(attr)).toBeTruthy();
    });

    it('should not have a linearGradient', () => {
      expect(element.querySelector('linearGradient#hr-gradient')).toBeFalsy();
    });
  });

  describe('=> with @Input: gradientEnabled', () => {
    beforeEach(() => {
      component.gradientEnabled = true;
      fixture.detectChanges();
    });

    it('should have a linearGradient', () => {
      expect(element.querySelector('linearGradient#hr-gradient')).toBeTruthy();
    });

    it('linearGradient should have attributes "y1, y2" when data changes', () => {
      // with data // needs to be parsed //
      component.chartData = parseMockTimeSeriesData(MockTimeSeriesData);
      const gradient = element.querySelector('linearGradient#hr-gradient');
      expect(gradient.getAttribute('y1')).toBeGreaterThan(0);
      expect(gradient.getAttribute('y2')).toBeGreaterThan(0);
    });
  });

});
