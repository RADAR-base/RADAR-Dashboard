/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardTileComponent } from '../dashboard-item/dashboard-tile.component';
import { DashboardTilesService } from '../../services/dashboard-tiles.service';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { TileType } from '../../shared/tile-type.const';

describe('Component: Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          DashboardComponent,
          DashboardTileComponent
        ],
        providers: [
          DashboardTilesService,
          TileType
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
