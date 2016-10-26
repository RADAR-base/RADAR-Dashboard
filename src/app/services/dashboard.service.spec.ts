/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

describe('Service: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardService]
    });
  });

  it('should get items for dashboard',
    inject([DashboardService], (service: DashboardService) => {
      expect(service.getItems()).toBeTruthy();
    }));
});
