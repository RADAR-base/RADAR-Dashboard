/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardTilesService } from './dashboard-tiles.service';

describe('Service: Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardTilesService]
    });
  });

  it('should get tiles for dashboard',
    inject([DashboardTilesService], (service: DashboardTilesService) => {
      expect(service.getItems()).toBeTruthy();
    }));
});
