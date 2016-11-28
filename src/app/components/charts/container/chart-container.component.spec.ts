/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ChartContainerComponent } from './chart-container.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { ChartModule } from '../chart.module';
import { reducer } from '../../../reducers/index';
import { StoreModule } from '@ngrx/store';

describe('Component: Tile', () => {
  let component: ChartContainerComponent;
  let fixture: ComponentFixture<ChartContainerComponent>;
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
    fixture = TestBed.createComponent(ChartContainerComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;

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

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

});

