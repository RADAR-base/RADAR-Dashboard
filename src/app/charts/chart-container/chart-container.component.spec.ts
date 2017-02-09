import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ChartContainerComponent } from './chart-container.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../store';
import { ChartModule } from '../chart.module';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';

describe('ChartContainerComponent', () => {
  let component: ChartContainerComponent;
  let fixture: ComponentFixture<ChartContainerComponent>;
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

    fixture = TestBed.createComponent(ChartContainerComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('Heart Rate Type', () => {
    beforeEach(() => {
      // Tile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Heart Rate Monitoring',
        type: 'heart-rate'
      };
      fixture.detectChanges();
    });

    it('should have a tile with title "Heart Rate Monitoring"', async(() => {
      expect(component.title)
        .toBe('Heart Rate Monitoring');
      expect(element.querySelector('.title').textContent)
        .toBe('Heart Rate Monitoring');
    }));

    it('should have a "app-chart-heart-rate" component', async(() => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.HR);
      expect(element.querySelector('app-chart-heart-rate'))
        .toBeTruthy();
    }));
  });

  describe('Acceleration Type', () => {
    beforeEach(() => {
      // Tile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Accelerometer Monitoring',
        type: 'acceleration'
      };
      fixture.detectChanges();
    });

    it('should have a tile with title "Accelerometer Monitoring"', async(() => {
      expect(component.title)
        .toBe('Accelerometer Monitoring');
      expect(element.querySelector('.title').textContent)
        .toBe('Accelerometer Monitoring');
    }));

    it('should have a "app-chart-acceleration" component', async(() => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.AC);
      expect(element.querySelector('app-chart-acceleration'))
        .toBeTruthy();
    }));
  });

  describe('Empty Type', () => {
    beforeEach(() => {
      // Tile Stub
      component.tile = {
        id: 1,
        rows: 2,
        cols: 3,
        title: 'Empty',
        type: 'empty'
      };
      fixture.detectChanges();
    });

    it('should have a "app-chart-empty" component', async(() => {
      expect(component.tile.type)
        .toBe(component.CHART_TYPE.EMPTY);
      expect(element.querySelector('app-chart-empty'))
        .toBeTruthy();
    }));
  });

});

