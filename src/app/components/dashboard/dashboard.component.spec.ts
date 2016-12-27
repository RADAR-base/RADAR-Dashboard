import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DebugElement } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from '../../reducers/index';
import { MaterialModule } from '@angular/material';
import { UIProgressComponent } from '../ui-progress/ui-progress.component';
import { ChartModule } from '../charts/chart.module';
import * as gridAction from '../../actions/grid';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let element: HTMLElement;
  let de: DebugElement;
  let store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartModule,
        MaterialModule,
        StoreModule.provideStore(reducer),
      ],
      declarations: [
        DashboardComponent,
        UIProgressComponent,
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  beforeEach(inject([Store], s => {
    store = s;
  }));

  it('creates the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('shows loading', async(() => {
    expect(element.querySelector('app-ui-progress')).toBeTruthy();
    expect(element.querySelector('md-grid-list')).toBeFalsy();
  }));

  it('shows the grid', async(() => {
    let mockGrid = [
      {
        'cols': 3,
        'id': 1,
        'rows': 2,
        'title': 'Heart Rate Monitoring',
        'type': 'heart-rate'
      },
      {
        'cols': 1,
        'id': 2,
        'rows': 1,
        'title': 'TBD',
        'type': 'empty'
      }
    ];

    store.dispatch(new gridAction.LoadSuccess(mockGrid));

    component.tiles$.subscribe(() => {
      fixture.detectChanges();
      expect(element.querySelector('app-ui-progress')).toBeFalsy();
      expect(element.querySelector('md-grid-list')).toBeTruthy();
    });
  }));

});
