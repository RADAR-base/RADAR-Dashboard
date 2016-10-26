/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';
import { DashboardService } from '../../services/dashboard.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

describe('Component: Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          DashboardComponent,
          DashboardItemComponent
        ],
        providers: [
          DashboardService
        ],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

});
