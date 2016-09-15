/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';
import { DashboardService } from '../../services/dashboard.service';

describe('Component: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        DashboardItemComponent
      ],
      providers: [
        DashboardService
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(DashboardComponent);
    let el = fixture.debugElement.componentInstance;
    expect(el).toBeTruthy();
  }));

});
