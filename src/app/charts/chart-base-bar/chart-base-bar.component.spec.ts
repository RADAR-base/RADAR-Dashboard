import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartBaseBarComponent } from './chart-base-bar.component';
import { DebugElement } from '@angular/core';
import { MockTimeSeriesData, parseMockTimeSeriesData } from '../../test/mock-timeseries-data';

describe('ChartBaseBarComponent', () => {
  let component: ChartBaseBarComponent;
  let fixture: ComponentFixture<ChartBaseBarComponent>;
  let element: HTMLElement;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartBaseBarComponent]
    });

    fixture = TestBed.createComponent(ChartBaseBarComponent);
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

    it('rect should have attribute x and y when data changes', async(() => {
      const rectEl = element.querySelector('rect.bar');
      const attr = 'x';

      // without data
      expect(rectEl.getAttribute(attr)).toBeFalsy();

      // with data // needs to be parsed //
      component.chartData = parseMockTimeSeriesData(MockTimeSeriesData);
      expect(rectEl.getAttribute(attr)).toBeTruthy();

    }));

  });

});
